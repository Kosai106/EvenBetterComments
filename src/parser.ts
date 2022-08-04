import * as vscode from 'vscode';
import { Configuration } from './configuration';
import { getLinksRangesDoc } from './providers/CommentLinkProvider';

import { linkedCommentDecoration } from './providers/DecorationProvider';
import { DocumentLoader } from './document';
import { HashSet } from './typings/Collections';

	// TODO: make Parser use simple regex when first loading, allow complex parsing after some time so that highlights are visible immediately;


export class Parser {
	private readonly tags: CommentTag[] = [];
	private readonly tagsMap: Map<string,CommentTag> = new Map<string,CommentTag>();

	//Stores all searching patterns for the tags.
	private readonly Expressions = {
		MonoLine: / /,
		MultiLine: / /,
		MultiLineJS: / /,
	}


	private delimiter: string = "";
	private blockCommentStart: string = "";
	private blockCommentEnd: string = "";

	private highlightMonolineComments = false;
	private highlightMultilineComments = false;
	private highlightJSDoc = true;
	private highlightLinkedComments = true;

	// * this will allow plaintext files to show comment highlighting if switched on
	private isPlainText = false;
	// * this is used to prevent the first line of the file (specifically python) from coloring like other comments
	private ignoreFirstLine = false;
	// * this is used to trigger the events when a supported language code is found
	public supportedLanguage = true;



	//TODO: Add command to refresh contributions.

	// Read from the package.json
	private contributions: Contributions = vscode.workspace.getConfiguration('evenbettercomments') as any;
	// The configuration necessary to find supported languages on startup
	private configuration: Configuration;
	/** Creates a new instance of the Parser class */
	public constructor(config: Configuration) {
		this.configuration = config;
		this.setTags();
	}

	//TODO: Allow multiline block comment formatting by placing the tag on the same line just after the start delimiter. 

	//TODO: create a map for tags to avoid using find for everey match every update.
	//Tools==========================================================================================================================================
	
 	//TODO: just save the regex string, this.tags should not change.	
	/** Build up regex matcher for custom delimiter tags */
	private static JoinDelimiterArray(tags : Array<CommentTag>) : string {
		return tags.map(commentTag => commentTag.escapedTag).join('|');
	}

	private static CreateRange(document: vscode.TextDocument, startIndex : number, endIndex : number) : vscode.Range {
		return new vscode.Range(document.positionAt(startIndex), document.positionAt(endIndex));
	}

	
	/**
	 * Static method used to create CommentTag objects.
	 * @param itemTag The string that repesents the tag.
	 * @returns {CommentTag} The created CommentTag object.
	 */
	private static CreateTag(itemTag : string, options : vscode.DecorationRenderOptions) : CommentTag {
		const escapedSequence = itemTag.replace(/([()[{*+.$^\\|?])/g, '\\$1');
		return <CommentTag>{
			tag: itemTag,
			escapedTag: Parser.escapeSlashes(escapedSequence),  //? hardcoded to escape slashes
			lowerTag: itemTag.toLowerCase(), //? used for comparison
			ranges: [],
			decoration: vscode.window.createTextEditorDecorationType(options)
		};
	}

	private static TagDefinitionToDecorationOptions(tag : TagDefinition) {
		const options = <vscode.DecorationRenderOptions>{ color: tag.color, backgroundColor: tag.backgroundColor };

		// ? the textDecoration is initialised to empty so we can concat a preceeding space on it
		options.textDecoration = "";

		//TODO: add line styles like dotted wavy etc... - https://developer.mozilla.org/en-US/docs/Web/CSS/text-decoration
		if (tag.overline) options.textDecoration += " overline";
		if (tag.strikethrough) options.textDecoration += "line-through";
		if (tag.underline) options.textDecoration += " underline";
		if (tag.bold) options.fontWeight = "bold";
		if (tag.italic) options.fontStyle = "italic";

		return options;
	}
	
	/**
	 * Escapes a given string for use in a regular expression
	 * @param input The input string to be escaped
	 * @returns {string} The escaped string
	 */
	private static escapeRegExp(input: string): string { return input.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); } // $& means the whole matched string
	private static escapeSlashes(input: string): string { return input.replace(/\//ig, "\\/"); } //? hardcoded to escape slashes

	private static *MatchAllInText(text:string, pattern:RegExp): Generator<RegExpExecArray> {
		for (let match:RegExpExecArray|null; (match = pattern.exec(text));) yield match;
	}

	//===============================================================================================================================================


	//TODO: preprocess to find lines with comment characters to pass to each function, save them the hassle of parsing the entire document.
	// Called to handle events below
	public UpdateDecorations(activeEditor : vscode.TextEditor) {
		// if lanugage isn't supported, return
		if (!this.supportedLanguage) return;
		// if no active window is open, return
		if (!activeEditor) return;

		// Finds the single line comments using the language comment delimiter
		this.FindSingleLineComments(activeEditor);
		// Finds the multi line comments using the language comment delimiter
		this.FindBlockComments(activeEditor);
		// Finds the jsdoc comments
		this.FindJSDocComments(activeEditor);

		// Apply the styles set in the package.json
		this.ApplyDecorations(activeEditor);
	};


	/**
	 * Sets the regex to be used by the matcher based on the config specified in the package.json
	 * @param languageCode The short code of the current language
	 * https://code.visualstudio.com/docs/languages/identifiers
	 */
	public SetRegex(languageCode: string) {
		this.setDelimiter(languageCode); //This checks if language is supported as well. Make better name. InitialiseLanguage?
		// if the language isn't supported, we don't need to go any further
		if (!this.supportedLanguage) return;


		//..............................................
		
		const expression = ((this.isPlainText && this.contributions.highlightPlainText)
			// start by tying the regex to the first character in a line
			? "(^)+([ \\t]*[ \\t]*)"
			// start by finding the delimiter (//, --, #, ') with optional spaces or tabs
			: "(" + this.delimiter + ")+([ \\t])*"
		// Apply all configurable comment start tags
		) + "("+ Parser.JoinDelimiterArray(this.tags) +")+(.*)";
		// if it's plain text, we have to do mutliline regex to catch the SOL with ^ and EOL with $
		this.Expressions.MonoLine = new RegExp(expression, (this.isPlainText)? "igm" : "ig");

		//..............................................
		
		// Use start and end delimiters to find block comments
		this.Expressions.MultiLine = new RegExp("(^|[ \\t])(" + this.blockCommentStart + "[^\\*])+([\\s\\S]*?)(" + this.blockCommentEnd + ")", "gm");
		/*                         "(^|[ \\t])(this.blockCommentStart[\\s])+([\\s\\S]*?)(this.blockCommentEnd)"
		
		        "(^|[ \\t])                 (this.blockCommentStart[\\s])+               ([\\s\\S]*?)          (this.blockCommentEnd)"
		capture newline or whitespace   capture block start and whitespace char     capture any characters        capture block end
		     single character                       at least one                        all non greedy                single char    
		*/

		//..............................................

		// Combine custom delimiters and the rest of the comment block matcher
		this.Expressions.MultiLineJS = /(^|[ \t])(\/\*\*)+([\s\S]*?)(\*?\*\/)/gm; // Find rows of comments matching pattern /** */
		/*                               /(^|[ \t])(\/\*\*)+([\s\S]*?)(\*\/)/gm
		        (^|[ \t])                         (\/\*\*)+            ([\s\S]*?)                 (\*\/)                gm
		begining of line or whitespace       one or more '/ **'    all characters non greedy    one match '*-/'   global multiline
		*/
	}











	/**  .......................................................................................................................
	 * Finds all single line comments delimited by a given delimiter and matching tags specified in package.json
	 * @param activeEditor The active text editor containing the code document
	**/
	public FindSingleLineComments(activeEditor: vscode.TextEditor): void {
		// If highlight single line comments is off, single line comments are not supported for this language
		if (!this.highlightMonolineComments) return;

		for (const match of Parser.MatchAllInText(activeEditor.document.getText(), this.Expressions.MonoLine)) {
			const startPos = activeEditor.document.positionAt(match.index);
			const endPos = activeEditor.document.positionAt(match.index + match[0].length);
			
			// Required to ignore the first line of files (#61) Many scripting languages start their file with a shebang to indicate which interpreter should be used (i.e. python3 scripts have #!/usr/bin/env python3)
			if (this.ignoreFirstLine && (startPos.line === 0 && startPos.character === 0)) continue;

			const LineArray = DocumentLoader.getDocument(activeEditor.document.uri)?.getLineTokenData(startPos);
			// console.log("Has Document: ", (DocumentLoader.getDocument(activeEditor.document.uri) !== undefined));
			if (LineArray) {
				if (LineArray.hasTokenType(StandardTokenType.Comment)) {
					const searchRegex = "(.*?)("+ this.delimiter +")+[ \\t]*(" + Parser.JoinDelimiterArray(this.tags) + ")+(.*)"
					// console.log("Has comment token");
					
					const offset = LineArray.offsetOf(StandardTokenType.Comment);
					const matchResult = activeEditor.document.lineAt(startPos).text.substring(offset).match(searchRegex);
					if (matchResult) {
						// Find which custom delimiter was used in order to add it to the collection
						const matchString = (matchResult[3] as string).toLowerCase();
						if (this.tagsMap.has(matchString)) {
							// const DelimiterOffset = offset + matchResult[1].length;
							const range = new vscode.Range(startPos.line, startPos.character, endPos.line, activeEditor.document.lineAt(startPos).text.length);
							// console.log(searchRegex, "\n",  activeEditor.document.lineAt(startPos).text.substring(offset), "\n", offset, "\n", matchResult, "\n", range);
							this.tagsMap.get(matchString)!.ranges.push(range);
						}
					}
				}
			}  else {
				// Find which custom delimiter was used in order to add it to the collection
				const matchString = (match[3] as string).toLowerCase();
				if (this.tagsMap.has(matchString)) this.tagsMap.get(matchString)!.ranges.push(new vscode.Range(startPos, endPos));
			}
		}
	}













	/**
	 * Finds block comments as indicated by start and end delimiter
	 * @param activeEditor The active text editor containing the code document
	 */
	public FindBlockComments(activeEditor: vscode.TextEditor): void {
		// If highlight multiline is off in package.json or doesn't apply to his language, return
		if (!this.highlightMultilineComments) return;
		

		// Combine custom delimiters and the rest of the comment block matcher
		const commentMatchString = "(^)+([ \\t]*(?:"+ this.blockCommentStart +")?[ \\t]*)("+ Parser.JoinDelimiterArray(this.tags) +")([ ]*|[:])+(?<!\\*)(.*?(?=\\*?"+this.blockCommentEnd+"|$))";
		const commentRegEx = new RegExp(commentMatchString, "igm");


		// Find the multiline comment block
		for (const match of Parser.MatchAllInText(activeEditor.document.getText(), this.Expressions.MultiLine)) {
			const commentBlock = match[0];
			// Find the line
			for (const line of Parser.MatchAllInText(commentBlock, commentRegEx)) {
				// Find which custom delimiter was used in order to add it to the collection
				const matchString = (line[3] as string).toLowerCase();
				if (this.tagsMap.has(matchString)) {
					const lineMatchIndex = line.index + match.index; //Adds index of start of block to index of match within the block.
					// length of leading delimeter and spaces        //length of line
					const range = Parser.CreateRange(activeEditor.document, lineMatchIndex + line[2].length, lineMatchIndex + line[0].length);
					
					this.tagsMap.get(matchString)!.ranges.push(range);
				}
			}
		}
	}









	/** 
	 * Finds all multiline comments starting with "*"
	 * @param activeEditor The active text editor containing the code document
	 */
	public FindJSDocComments(activeEditor: vscode.TextEditor): void {
		// If highlight multiline is off in package.json or doesn't apply to his language, return
		if (!this.highlightMultilineComments && !this.highlightJSDoc) return;

		// Highlight after leading /** or *
		const commentMatchString = "(^)+([ \\t]*(?:/\\*\\*|\\*)[ \\t]*)("+ Parser.JoinDelimiterArray(this.tags) +")([ ]*|[:])+(?<!\\*)(.*?(?=\\*?\\*/|$))";
		const commentRegEx = new RegExp(commentMatchString, "igm");


		// const text = activeEditor.document.getText();
		// for (let match:RegExpExecArray|null; (match = this.Expressions.MultiLineJS.exec(text));) {
		// Find the multiline comment block
		for (const match of Parser.MatchAllInText(activeEditor.document.getText(), this.Expressions.MultiLineJS)) {
			const commentBlock = match[0];
			// Find the line
			for (const line of Parser.MatchAllInText(commentBlock, commentRegEx)) {
				// Find which custom delimiter was used in order to add it to the collection
				const matchString = (line[3] as string).toLowerCase();
				if (this.tagsMap.has(matchString)) {
					const lineMatchIndex = line.index + match.index;
																		// length of leading delimeter and spaces        //length of line
					const range = Parser.CreateRange(activeEditor.document, lineMatchIndex + line[2].length, lineMatchIndex + line[0].length);

					this.tagsMap.get(matchString)!.ranges.push(range);
				}
			}
		}
	}

	//===============================================================================================================================================















	/** .......................................................................................................................
	 * Apply decorations after finding all relevant comments
	 * @param activeEditor The active text editor containing the code document
	 */
	public ApplyDecorations(activeEditor: vscode.TextEditor): void {
		// this.ApplyHide(activeEditor);
		for (const tag of this.tags) {
			activeEditor.setDecorations(tag.decoration, tag.ranges);
			tag.ranges.length = 0; // clear the ranges for the next pass
		}

		//Provides highlighting for comment links 
		if (this.highlightLinkedComments) {
			const ranges = getLinksRangesDoc(activeEditor.document);
			activeEditor.setDecorations(linkedCommentDecoration, ranges);
		}
	}




	//#region  Private Methods.......................................................................................................................

	/**
	 * Sets the comment delimiter [//, #, --, '] of a given language
	 * @param languageCode The short code of the current language
	 * https://code.visualstudio.com/docs/languages/identifiers
	 */
	private setDelimiter(languageCode: string): void {
		this.supportedLanguage = false;
		this.ignoreFirstLine = false;
		this.isPlainText = false;

		const config: vscode.CommentRule|undefined = this.configuration.GetCommentConfiguration(languageCode); 
		if (config) {
			this.supportedLanguage = true;

			const blockCommentStart = config.blockComment ? config.blockComment[0] : null;
			const blockCommentEnd = config.blockComment ? config.blockComment[1] : null;

			this.setCommentFormat(config.lineComment ?? blockCommentStart, blockCommentStart, blockCommentEnd);

			this.ignoreFirstLine = this.configuration.GetHasShebang(languageCode);
		}

		switch (languageCode) {
			case "apex":
			case "javascript":
			case "javascriptreact":
			case "typescript":
			case "typescriptreact":
				this.highlightJSDoc = true;
				break;

			case "elixir":
			case "python":
			case "perl":
			case "perl6":
			case "go":
			case "tcl":
				this.ignoreFirstLine = true;
				break;

			case "objectpascal":
				// This language seems to not have its config set up properly but it is supported.
				this.supportedLanguage = true;
				this.setCommentFormat("//", "/*", "*/");
				break;

			case "plaintext":
				this.isPlainText = true;
				// If highlight plaintext is enabled, this is a supported language
				this.supportedLanguage = this.contributions.highlightPlainText;
				break;
		}
	}
	

	/** Sets the highlighting tags up for use by the parser */
	private setTags(): void {
		for (const item of this.contributions.tags) {
			//Create the format used for the tag
			const options = Parser.TagDefinitionToDecorationOptions(item);
			
			//TODO: allow item.tag to be an array? Avoid the need for alias to begin with.
			//Create CommentTag for primary tag
			let currentTag = Parser.CreateTag(item.tag, options);
			this.tags.push(currentTag);
			this.tagsMap.set(currentTag.lowerTag, currentTag);
			
			//Turn each alias into its own CommentTag because im lazy and it is easy to do.
			item.aliases?.forEach(aliasTag => {
				currentTag = Parser.CreateTag(aliasTag, options);
				this.tags.push(currentTag)
				this.tagsMap.set(currentTag.lowerTag, currentTag);
			});
		}
	}

	

	


	/**
	 * Set up the comment format for single and multiline highlighting
	 * @param monoLine The single line comment delimiter. If NULL, monoline is not supported
	 * @param start The start delimiter for block comments
	 * @param end The end delimiter for block comments
	 */
	private setCommentFormat(monoLine: string|string[]|null, start: string|null = null, end: string|null = null): void {
		this.delimiter = "";
		this.blockCommentStart = "";
		this.blockCommentEnd = "";

		// If no single line comment delimiter is passed, monoline comments are not supported
		if (monoLine) {
			this.highlightMonolineComments = this.contributions.monolineComments;
			if (IsString(monoLine)) {
				this.delimiter = Parser.escapeSlashes(Parser.escapeRegExp(monoLine));
			} else if (monoLine.length > 0) {
				// * if multiple delimiters are passed, the language has more than one single line comment format
				this.delimiter = monoLine.map(Parser.escapeRegExp).map(Parser.escapeSlashes).join("|");
			}
		}

		if (start && end) {
			this.highlightMultilineComments = this.contributions.multilineComments;
			this.blockCommentStart = Parser.escapeRegExp(start);
			this.blockCommentEnd = Parser.escapeRegExp(end);
		}
	}



	//#endregion
}



export function IsString(item:any): item is String {return typeof item === 'string';}




// function OffsetFromRegex(array:RegExpExecArray|RegExpMatchArray, index:number) {
// 	let returnValue = 0;
// 	const numberStop = (index >= 1 && index < array.length)? index : array.length;
// 	for (let i:number=1; i<numberStop; i++) returnValue += array[i].length;
// 	return returnValue;
// }



/**
 * A set listing all of the "languages", like plaintext, that don't have comment syntax
 * @returns {string[]} 
 */
export const TextLanguages = new HashSet<string>('code-text-binary', 'bibtex', 'log', 'Log', 'search-result', 'plaintext', 'juliamarkdown', 'scminput', 'properties', 'csv', 'tsv', 'excel');



		
		/*  "(^)+([ \\t]*[ \\t]*)(|chars|)([ ]*|[:])+([^* /][^\\r\\n]*)"
			
			"(^)+                 ([ \\t]*[ \\t]*)              (|chars|)                   ([ ]*|[:])+                         ([^* /][^\\r\\n]*)"
		capture start pos        capture whitespace          capture any tag        capture trailing spaces/colon         capture char not {* or /} any char not {\r\n}
		at least one of them    any number of leading     first tag first non ws            one or more                             one char             any chars
		
		              ([ \\t]*                  (?:this.blockCommentStart)?              [ \\t]*)
		capture    any leading whitespace       dont index block start            any trailing whitespace
		*/










		/*                 "(^)+([ \\t]*(?:/\\*\\*|\\*)[ \\t]*)(|characters|)([ ]*|[:])+([^* /][^\\r\\n]*)"
		        "(^)+                          ([ \\t]*(?:/\\*\\*|\\*)[ \\t]*)                      (|characters|)           ([ ]*|[:])+         ([^* /][^\\r\\n]*)"
		one or many beginings     any-all whitespace {dont group '/**' or '/*'} any-all whitespace     some tag        all space/one colon       one '*-/' any chars not newline

						"([ \\t]*\\*[ \\t]*)"
		*/





















	/**
	 * Idea: first split document up into groups that are not block comments and ones that are. Iterate over each individual group and apply the formatting appropriately.
	 * ? Nothing is telling this code not to parse single line and multi line in the same area.
	 * 
	 * ISSUE: When you put "//*" inside a string, it will detect that line as a string from that point onwards.
	 * Example: ^"//*" this text gets highlighted;
	 *
	 * [[Hello ]] dadw [[    ]]
	**/





	/*!*/
	/**!*/
	/*!**/
	/**!**/
	
	/*! */
	/**! */
	/*! **/
	/**! **/

	/* !*/
	/** !*/
	/* !**/
	/** !**/

	/* ! */
	/** ! */
	/* ! **/
	/** ! **/











	
//The idea is that monoline comments which are the only content on the line are easy to identify
//same goes for block comments which span multiple lines, however,
//identifying comments which are on the same line as actual code/text, is near impossible to properly support without parsing grammar.
//So it stands to reason that using simple regex to find the easy cases combined with the more intensive grammar parsing on possible matches 
//Will enable a fast decoration while handling all of the edge cases as they appear in the more accurate but worst performance way would be ideal.

//Plan:
//Use regex for finding monoline comments which are the only content on the line,
//Use refex for finding multiline block comments which span many lines

//Use regex to identify possible mixed lines and pass to the token parser to extract those comments to maintain consitant highlightning.

//.................................
//(^)[ \t]*(//)[ \t]*(\*|Todo)([ :].*)
//.................................
//? Finds all basic monoline comments
//(^)[ \t]*(//)[ \t]*(.*)
//? Finds all basic multiline comments
//(^)[ \t]*(/\*\*?)((?:.*[\r\n]+)*?.*)(\*?\*/)

//? Finds all possible mixed monoline comments
//(^[ \t]*(?!//)\S.*?)(//)(.*)
//? Finds all possible mixed multiline comments
//(^[ \t]*\S.*?)(/\*\*?)((?:.*[\r\n]+)*?.*)(\*?\*/)

//For possible mixed comments, check the token just before if its a comment, if it is then ignore the match.





//TODO: on multiline, check if starts with delimiter
