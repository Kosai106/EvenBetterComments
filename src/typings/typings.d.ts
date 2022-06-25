interface CommentTag {
    tag: string;
	// aliases: Array<string>;
    escapedTag: string;
    // escapedAliases: Array<string>;
    decoration: any;
    ranges: Array<any>;
}

interface Contributions {
    multilineComments: boolean;
    useJSDocStyle: boolean;
    highlightPlainText: boolean;
	ignoreShebangFormat: boolean;
    tags: [{
        tag: string;
		aliases: Array<string>;
        color: string;
        strikethrough: boolean;
        underline: boolean;
        bold: boolean;
        italic: boolean;
        backgroundColor: string;
    }];
}

interface CommentConfig {
    lineComment?: string;
    blockComment?: [string, string];
}