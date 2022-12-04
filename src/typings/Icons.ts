
const enum Icons {
	IconAlert = "alert",
	IconArchive = "archive",
	IconArray = "array",
	IconArrowBoth = "arrow-both",
	IconArrowDown = "arrow-down",
	IconArrowLeft = "arrow-left",
	IconArrowRight = "arrow-right",
	IconArrowUp = "arrow-up",
	IconArrowCircleDown = "arrow-circle-down",
	IconArrowCircleLeft = "arrow-circle-left",
	IconArrowCircleRight = "arrow-circle-right",
	IconArrowCircleUp = "arrow-circle-up",
	IconArrowSmallDown = "arrow-small-down",
	IconArrowSmallLeft = "arrow-small-left",
	IconArrowSmallRight = "arrow-small-right",
	IconArrowSmallUp = "arrow-small-up",
	IconBeaker = "beaker",
	IconBell = "bell",
	IconBellDot = "bell-dot",
	IconBold = "bold",
	IconBook = "book",
	IconBookmark = "bookmark",
	IconBrace = "bracket",
	IconBracket = "array",
	IconBriefcase = "briefcase",
	IconBroadcast = "broadcast",
	IconBrowser = "browser",
	IconBug = "bug",
	IconCalendar = "calendar",
	IconCaseSensitive = "case-sensitive",
	IconCheck = "check",
	IconCheckAll = "check-all",
	IconChecklist = "checklist",
	IconChevronDown = "chevron-down",
	IconChevronLeft = "chevron-left",
	IconChevronRight = "chevron-right",
	IconChevronUp = "chevron-up",
	IconCircleOutline = "circle-outline",
	IconCircleLargeOutline = "circle-large-outline",
	IconCircleSlash = "circle-slash",
	IconCircuitBoard = "circuit-board",
	IconClearAll = "clear-all",
	IconClippy = "clippy",
	IconClock = "clock",
	IconClone = "clone",
	IconClose = "close",
	IconCloseAll = "close-all",
	IconCloud = "cloud",
	IconCloudDownload = "cloud-download",
	IconCloudUpload = "cloud-upload",
	IconCode = "code",
	IconColorMode = "color-mode",
	IconComment = "comment",
	IconCommentDiscussion = "comment-discussion",
	IconCompass = "compass",
	IconConsole = "console",
	IconCreditCard = "credit-card",
	IconDash = "dash",
	IconDashboard = "dashboard",
	IconDatabase = "database",
	IconDesktopDownload = "desktop-download",
	IconDeviceCamera = "device-camera",
	IconDeviceCameraVideo = "device-camera-video",
	IconDeviceDesktop = "device-desktop",
	IconDeviceMobile = "device-mobile",
	IconDiff = "diff",
	IconDiffAdded = "diff-added",
	IconDiffIgnored = "diff-ignored",
	IconDiffModified = "diff-modified",
	IconDiffRemoved = "diff-removed",
	IconDiffRenamed = "diff-renamed",
	IconDiffDiscard = "discard",
	IconEdit = "edit",
	IconEllipsis = "ellipsis",
	IconEmptyWindow = "empty-window",
	IconError = "error",
	IconErrorSmall = "error-small",
	IconExpandAll = "expand-all",
	IconExport = "export",
	IconExtensions = "extensions",
	IconEye = "eye",
	IconEyeClosed = "eye-closed",
	IconFile = "file",
	IconFileAdd = "file-add",
	IconFileBinary = "file-binary",
	IconFileCode = "file-code",
	IconFileDirectory = "file-directory",
	IconFileDirectoryCreate = "file-directory-create",
	IconFileMedia = "file-media",
	IconFilePdf = "file-pdf",
	IconFileSubmodule = "file-submodule",
	IconFileSymlinkDirectory = "file-symlink-directory",
	IconFileSymlinkFile = "file-symlink-file",
	IconFileText = "file-text",
	IconFileZip = "file-zip",
	IconFiles = "files",
	IconFilter = "filter",
	IconFilterFilled = "filter-filled",
	IconFlame = "flame",
	IconFold = "fold",
	IconFoldDown = "fold-down",
	IconFoldUp = "fold-up",
	IconFolder = "folder",
	IconFolderOpened = "folder-opened",
	IconGear = "gear",
	IconGift = "gift",
	IconGist = "gist",
	IconGistFork = "gist-fork",
	IconGistNew = "gist-new",
	IconGistPrivate = "gist-private",
	IconGistSecret = "gist-secret",
	IconGitBranch = "git-branch",
	IconGitCommit = "git-commit",
	IconGitCompare = "git-compare",
	IconGitForkPrivate = "git-fork-private",
	IconGitMerge = "git-merge",
	IconGitPullRequest = "git-pull-request",
	IconGithubAction = "github-action",
	IconGlobe = "globe",
	IconGoToFile = "go-to-file",
	IconGrabber = "grabber",
IconTwoBars = "grabber",
	IconGraph = "graph",
	IconGripper = "gripper",
	IconHeart = "heart",
	IconHistory = "history",
	IconHome = "home",
	IconHorizontalRule = "horizontal-rule",
	IconHubot = "hubot",
	IconInbox = "inbox",
	IconIndent = "indent",
	IconInspect = "inspect",
	IconInfo = "info",
	IconIssueClosed = "issue-closed",
	IconIssueOpened = "issue-opened",
	IconIssueReopened = "issue-reopened",
	IconItalic = "italic",
	IconJersey = "jersey",
	IconKebabHorizontal = "kebab-horizontal",
	IconKebabVertical = "kebab-vertical",
	IconKey = "key",
	IconKeyboard = "keyboard",
	IconLaw = "law",
	IconLayers = "layers",
	IconLayoutActivitybarLeft = "layout-activitybar-left",
	IconLayoutActivitybarRight = "layout-activitybar-right",
	IconLayoutCentered = "layout-centered",
	IconLayoutPanel = "layout-panel",
	IconLayoutPanelRight = "layout-panel-right",
	IconLayoutPanelLeft = "layout-panel-left",
	IconLayoutSidebarLeft = "layout-sidebar-left",
	IconLayoutSidebarRight = "layout-sidebar-right",
	IconLayoutStatusbar = "layout-statusbar",
IconLayoutBottom = "layout-panel",
IconLayoutBottomSmall = "layout-statusbar",
IconLayoutLeft = "layout-sidebar-left",
IconLayoutLeftSmall = "layout-activitybar-left",
IconLayoutRight = "layout-sidebar-right",
IconLayoutRightSmall = "layout-activitybar-right",
IconLayoutBottomRight = "layout-panel-right",
IconLayoutBottomLeft = "layout-panel-left",
	IconLightBulb = "light-bulb",
	IconLink = "link",
	IconLinkExternal = "link-external",
	IconListFilter = "list-filter",
	IconListFlat = "list-flat",
	IconListOrdered = "list-ordered",
	IconListUnordered = "list-unordered",
	IconLocation = "location",
	IconLock = "lock",
	IconLogIn = "log-in",
	IconLogOut = "log-out",
	IconLogoGithub = "logo-github",
	IconMail = "mail",
	IconMailRead = "mail-read",
	IconMailReply = "mail-reply",
	IconMarkGithub = "mark-github",
	IconMarkdown = "markdown",
	IconMegaphone = "megaphone",
	IconMention = "mention",
	IconMilestone = "milestone",
	IconMirror = "mirror",
	IconMirrorPrivate = "mirror-private",
	IconMirrorPublic = "mirror-public",
	IconMortarBoard = "mortar-board",
	IconMenu = "menu",
	IconMore = "more",
	IconMute = "mute",
	IconMove = "move",
	IconNewFile = "new-file",
	IconNewFolder = "new-folder",
	IconNewline = "newline",
	IconNoNewline = "no-newline",
	IconNote = "note",
	IconOctoface = "octoface",
	IconOrganization = "organization",
	IconOrganizationFilled = "organization-filled",
	IconOutput = "output",
	IconPass = "pass",
	IconPackage = "package",
	IconPaintcan = "paintcan",
	IconPencil = "pencil",
	IconPerson = "person",
	IconPersonFilled = "person-filled",
	IconPin = "pin",
	IconPinned = "pinned",
	IconPlay = "play",
IconPlayAll = "run-all",
	IconPlayCircle = "play-circle",
	IconPlug = "plug",
	IconPlus = "plus",
	IconPreserveCase = "preserve-case",
	// IconPrimitiveDot = "primitive-dot",
	// IconPrimitiveSquare = "primitive-square",
	IconProject = "project",
	IconPulse = "pulse",
	IconQuestion = "question",
	IconQuote = "quote",
	IconRadioTower = "radio-tower",
	IconUndo = "discard",
	IconRedo = "redo",
	IconRefresh = "refresh",
	IconRemove = "remove",
	IconRemoveClose = "remove-close",
	IconRepl = "repl",
	IconReplace = "replace",
	IconReplaceAll = "replace-all",
	IconReply = "reply",
	IconRepo = "repo",
	IconRepoClone = "repo-clone",
	IconRepoCreate = "repo-create",
	IconRepoForcePush = "repo-force-push",
	IconRepoForked = "repo-forked",
	IconRepoPull = "repo-pull",
	IconRepoPush = "repo-push",
	IconRepoSync = "repo-sync",
	IconReport = "report",
	IconRequestChanges = "request-changes",
	IconRocket = "rocket",
	IconRss = "rss",
	IconRuby = "ruby",
	IconRun = "run",
	IconRunAll = "run-all",
	IconSave = "save",
	IconSaveAll = "save-all",
	IconSaveAs = "save-as",
	IconScreenFull = "screen-full",
	IconScreenNormal = "screen-normal",
	IconSearch = "search",
	IconSearchStop = "search-stop",
	IconServer = "server",
	IconSettings = "settings",
	IconSettingsGear = "settings-gear",
	IconShield = "shield",
	IconSignIn = "sign-in",
	IconSignOut = "sign-out",
	IconSmiley = "smiley",
	IconSplitHorisontal = "split-horizontal",
	IconSplitVertical = "split-vertical",
	IconSquirrel = "squirrel",
	IconStar = "star",
	IconStopCircleX = "stop",
	IconStopCircleSquare = "stop-circle",
	IconSymbolArray = "symbol-array",
	IconSymbolColor = "symbol-color",
IconSymbolCube = "symbol-method",
	IconSymbolFile = "symbol-file",
	IconSymbolFolder = "symbol-folder",
	IconSymbolNumber = "symbol-number",
	IconSymbolMethod = "symbol-method",
	IconSymbolMisc = "symbol-misc",
	IconSymbolText = "symbol-text",
	IconSync = "sync",
	IconSyncIgored = "sync-ignored",
	IconTag = "tag",
	IconTarget = "target",
	IconTasklist = "tasklist",
	IconTelescope = "telescope",
	IconTerminal = "terminal",
	IconTextSize = "text-size",
	IconThreeBars = "three-bars",
	IconThumbsdown = "thumbsdown",
	IconThumbsup = "thumbsup",
	IconTools = "tools",
	IconTrashcan = "trashcan",
	IconTriangleDown = "triangle-down",
	IconTriangleLeft = "triangle-left",
	IconTriangleRight = "triangle-right",
	IconTriangleUp = "triangle-up",
	IconUnfold = "unfold",
	IconUnmute = "unmute",
	IconUnverified = "unverified",
	IconVerified = "verified",
	IconVersions = "versions",
IconMachine = "vm",
	IconWarning = "warning",
	IconWatch = "watch",
	IconWholeWord = "whole-word",
	IconWindow = "window",
	IconWordWrap = "word-wrap",
	IconWrench = "wrench",
	IconX = "x",
	IconZap = "zap",
	IconZoomIn = "zoom-in",
	IconZoomOut = "zoom-out",






	IconPrimitiveSquare = "primitive-square",

	IconPrimitiveDot = "debug-breakpoint",
	IconPrimitiveDotOutline = "debug-breakpoint-unverified",
	IconPrimitiveHexagon = "debug-breakpoint-data",
	IconPrimitiveHexagonOutline = "debug-breakpoint-data-unverified",
	IconPrimitiveTriangle = "debug-breakpoint-function",
	IconPrimitiveTriangleOutline = "debug-breakpoint-function-unverified",
	IconPrimitiveDiamond = "debug-breakpoint-log",
	IconPrimitiveDiamondOutline = "debug-breakpoint-log-unverified",
	IconPrimitiveElongatedTriangle = "debug-stackframe",

	IconPrimitiveSmallDot = "debug-stackframe-dot",
	IconPrimitiveLargeDot = "circle-large",
	IconPrimitiveLargeDotOutline = "circle-large-outline",

	IconStart = "debug-start",
	IconPause = "debug-pause",
	IconRestart = "debug-restart",
	IconStop = "debug-stop",
	IconContinueForwards = "debug-continue",
	IconContinueBackwards = "debug-reverse-continue",
}
/**
 * Icon class
 */
class Icon {

	//Spinning may only work for the icons `sync`,`loading`,or `gear`
	public constructor(value: Icons);
	public constructor(value: Icons, spinning:bool);
	public constructor(public value: Icons, public spinning: boolean = false ) {}

	public toPlaceholder(): string {
		return Icon.placeholder(this.value, this.spinning);
	}

	public static placeholder(icon: Icons, spinning: boolean = false) {
		return spinning ? `$(${icon}~spin)` : `$(${icon})`;
	}

	// public static themeIcon(icon: Icons)
	public static async GetThemeIcon(icon: Icons) : Promise<ThemeIcon> {
		return VSCode.then(vscode => new vscode.ThemeIcon(icon));
	}
}

type ThemeIcon = import('vscode').ThemeIcon;
const VSCode = import('vscode');




// namespace Icon {
	
// 	export function getIconPath(type: string, theme: 'light' | 'dark') {
// 		const iconPath = path.join(__filename, '..', '..', '..', '..', 'icons', theme, type.toLowerCase() + '.svg');
// 		if (fs.existsSync(iconPath)) {
// 			return iconPath;
// 		}

// 		return path.join(__filename, '..', '..', '..', '..', 'icons', theme, 'todo.svg');
// 	}









// }





















const enum ProductIcons {
	AccountsViewBarIcon = "accounts-view-bar-icon",
	BreakpointsActivate = "breakpoints-activate",
	BreakpointsRemoveAll = "breakpoints-remove-all",
	BreakpointsViewIcon = "breakpoints-view-icon",
	CallhierarchyIncoming = "callhierarchy-incoming",
	CallhierarchyOutgoing = "callhierarchy-outgoing",
	CallstackViewIcon = "callstack-view-icon",
	CallstackViewSession = "callstack-view-session",
	CommentsViewIcon = "comments-view-icon",
	DebugBreakpoint = "debug-breakpoint",
	DebugBreakpointConditional = "debug-breakpoint-conditional",
	DebugBreakpointConditionalDisabled = "debug-breakpoint-conditional-disabled",
	DebugBreakpointConditionalUnverified = "debug-breakpoint-conditional-unverified",
	DebugBreakpointData = "debug-breakpoint-data",
	DebugBreakpointDataDisabled = "debug-breakpoint-data-disabled",
	DebugBreakpointDataUnverified = "debug-breakpoint-data-unverified",
	DebugBreakpointDisabled = "debug-breakpoint-disabled",
	DebugBreakpointFunction = "debug-breakpoint-function",
	DebugBreakpointFunctionDisabled = "debug-breakpoint-function-disabled",
	DebugBreakpointFunctionUnverified = "debug-breakpoint-function-unverified",
	DebugBreakpointLog = "debug-breakpoint-log",
	DebugBreakpointLogDisabled = "debug-breakpoint-log-disabled",
	DebugBreakpointLogUnverified = "debug-breakpoint-log-unverified",
	DebugBreakpointUnsupported = "debug-breakpoint-unsupported",
	DebugBreakpointUnverified = "debug-breakpoint-unverified",
	DebugCollapseAll = "debug-collapse-all",
	DebugConfigure = "debug-configure",
	DebugConsole = "debug-console",
	DebugConsoleClearAll = "debug-console-clear-all",
	DebugConsoleEvaluationInput = "debug-console-evaluation-input",
	DebugConsoleEvaluationPrompt = "debug-console-evaluation-prompt",
	DebugConsoleViewIcon = "debug-console-view-icon",
	DebugContinue = "debug-continue",
	DebugDisconnect = "debug-disconnect",
	DebugGripper = "debug-gripper",
	DebugHint = "debug-hint",
	DebugPause = "debug-pause",
	DebugRestart = "debug-restart",
	DebugRestartFrame = "debug-restart-frame",
	DebugReverseContinue = "debug-reverse-continue",
	DebugStackframe = "debug-stackframe",
	DebugStackframeFocused = "debug-stackframe-focused",
	DebugStart = "debug-start",
	DebugStepBack = "debug-step-back",
	DebugStepInto = "debug-step-into",
	DebugStepOut = "debug-step-out",
	DebugStepOver = "debug-step-over",
	DebugStop = "debug-stop",
	DefaultViewIcon = "default-view-icon",
	DiffEditorNextChange = "diff-editor-next-change",
	DiffEditorPreviousChange = "diff-editor-previous-change",
	DiffEditorToggleWhitespace = "diff-editor-toggle-whitespace",
	DiffInsert = "diff-insert",
	DiffRemove = "diff-remove",
	DiffReviewClose = "diff-review-close",
	DiffReviewInsert = "diff-review-insert",
	DiffReviewRemove = "diff-review-remove",
	ExplorerViewIcon = "explorer-view-icon",
	ExtensionsClearSearchResults = "extensions-clear-search-results",
	ExtensionsConfigureRecommended = "extensions-configure-recommended",
	ExtensionsFilter = "extensions-filter",
	ExtensionsInfoMessage = "extensions-info-message",
	ExtensionsInstallCount = "extensions-install-count",
	ExtensionsInstallLocalInRemote = "extensions-install-local-in-remote",
	ExtensionsInstallWorkspaceRecommended = "extensions-install-workspace-recommended",
	ExtensionsManage = "extensions-manage",
	ExtensionsRating = "extensions-rating",
	ExtensionsRefresh = "extensions-refresh",
	ExtensionsRemote = "extensions-remote",
	ExtensionsStarEmpty = "extensions-star-empty",
	ExtensionsStarFull = "extensions-star-full",
	ExtensionsStarHalf = "extensions-star-half",
	ExtensionsSyncEnabled = "extensions-sync-enabled",
	ExtensionsSyncIgnored = "extensions-sync-ignored",
	ExtensionsViewIcon = "extensions-view-icon",
	ExtensionsWarningMessage = "extensions-warning-message",
	FindCollapsed = "find-collapsed",
	FindExpanded = "find-expanded",
	FindNextMatch = "find-next-match",
	FindPreviousMatch = "find-previous-match",
	FindReplace = "find-replace",
	FindReplaceAll = "find-replace-all",
	FindSelection = "find-selection",
	FoldingCollapsed = "folding-collapsed",
	FoldingExpanded = "folding-expanded",
	GettingStartedBeginner = "getting-started-beginner",
	GettingStartedCodespaces = "getting-started-codespaces",
	GettingStartedItemChecked = "getting-started-item-checked",
	GettingStartedItemUnchecked = "getting-started-item-unchecked",
	GettingStartedSetup = "getting-started-setup",
	GotoNextLocation = "goto-next-location",
	GotoPreviousLocation = "goto-previous-location",
	KeybindingsAdd = "keybindings-add",
	KeybindingsEdit = "keybindings-edit",
	KeybindingsRecordKeys = "keybindings-record-keys",
	KeybindingsSort = "keybindings-sort",
	LoadedScriptsViewIcon = "loaded-scripts-view-icon",
	MarkerNavigationNext = "marker-navigation-next",
	MarkerNavigationPrevious = "marker-navigation-previous",
	MarkersViewFilter = "markers-view-filter",
	MarkersViewIcon = "markers-view-icon",
	MarkersViewMultiLineCollapsed = "markers-view-multi-line-collapsed",
	MarkersViewMultiLineExpanded = "markers-view-multi-line-expanded",
	NotebookClear = "notebook-clear",
	NotebookCollapsed = "notebook-collapsed",
	NotebookDeleteCell = "notebook-delete-cell",
	NotebookEdit = "notebook-edit",
	NotebookExecute = "notebook-execute",
	NotebookExecuteAll = "notebook-execute-all",
	NotebookExpanded = "notebook-expanded",
	NotebookKernelConfigure = "notebook-kernel-configure",
	NotebookKernelSelect = "notebook-kernel-select",
	NotebookMimetype = "notebook-mimetype",
	NotebookMoveDown = "notebook-move-down",
	NotebookMoveUp = "notebook-move-up",
	NotebookOpenAsText = "notebook-open-as-text",
	NotebookRenderOutput = "notebook-render-output",
	NotebookRevert = "notebook-revert",
	NotebookSplitCell = "notebook-split-cell",
	NotebookStateError = "notebook-state-error",
	NotebookStateSuccess = "notebook-state-success",
	NotebookStop = "notebook-stop",
	NotebookStopEdit = "notebook-stop-edit",
	NotebookUnfold = "notebook-unfold",
	NotificationsClear = "notifications-clear",
	NotificationsClearAll = "notifications-clear-all",
	NotificationsCollapse = "notifications-collapse",
	NotificationsConfigure = "notifications-configure",
	NotificationsExpand = "notifications-expand",
	NotificationsHide = "notifications-hide",
	OpenEditorsViewIcon = "open-editors-view-icon",
	OutlineViewIcon = "outline-view-icon",
	OutputViewIcon = "output-view-icon",
	PanelClose = "panel-close",
	PanelMaximize = "panel-maximize",
	PanelRestore = "panel-restore",
	ParameterHintsNext = "parameter-hints-next",
	ParameterHintsPrevious = "parameter-hints-previous",
	PortsForwardIcon = "ports-forward-icon",
	PortsOpenBrowserIcon = "ports-open-browser-icon",
	PortsStopForwardIcon = "ports-stop-forward-icon",
	PortsViewIcon = "ports-view-icon",
	PreferencesClearInput = "preferences-clear-input",
	PreferencesOpenSettings = "preferences-open-settings",
	PrivatePortsViewIcon = "private-ports-view-icon",
	PublicPortsViewIcon = "public-ports-view-icon",
	RefactorPreviewViewIcon = "refactor-preview-view-icon",
	RemoteExplorerDocumentation = "remote-explorer-documentation",
	RemoteExplorerFeedback = "remote-explorer-feedback",
	RemoteExplorerGetStarted = "remote-explorer-get-started",
	RemoteExplorerReportIssues = "remote-explorer-report-issues",
	RemoteExplorerReviewIssues = "remote-explorer-review-issues",
	RemoteExplorerViewIcon = "remote-explorer-view-icon",
	ReviewCommentCollapse = "review-comment-collapse",
	RunViewIcon = "run-view-icon",
	SearchClearResults = "search-clear-results",
	SearchCollapseResults = "search-collapse-results",
	SearchDetails = "search-details",
	SearchExpandResults = "search-expand-results",
	SearchHideReplace = "search-hide-replace",
	SearchNewEditor = "search-new-editor",
	SearchRefresh = "search-refresh",
	SearchRemove = "search-remove",
	SearchReplace = "search-replace",
	SearchReplaceAll = "search-replace-all",
	SearchShowContext = "search-show-context",
	SearchShowReplace = "search-show-replace",
	SearchStop = "search-stop",
	SearchViewIcon = "search-view-icon",
	SettingsAdd = "settings-add",
	SettingsDiscard = "settings-discard",
	SettingsEdit = "settings-edit",
	SettingsFolderDropdown = "settings-folder-dropdown",
	SettingsGroupCollapsed = "settings-group-collapsed",
	SettingsGroupExpanded = "settings-group-expanded",
	SettingsMoreAction = "settings-more-action",
	SettingsRemove = "settings-remove",
	SettingsSyncViewIcon = "settings-sync-view-icon",
	SettingsViewBarIcon = "settings-view-bar-icon",
	SourceControlViewIcon = "source-control-view-icon",
	SuggestMoreInfo = "suggest-more-info",
	TasksListConfigure = "tasks-list-configure",
	TasksRemove = "tasks-remove",
	TerminalKill = "terminal-kill",
	TerminalNew = "terminal-new",
	TerminalRename = "terminal-rename",
	TerminalViewIcon = "terminal-view-icon",
	TestViewIcon = "test-view-icon",
	TestingCancelIcon = "testing-cancel-icon",
	TestingDebugIcon = "testing-debug-icon",
	TestingErrorIcon = "testing-error-icon",
	TestingFailedIcon = "testing-failed-icon",
	TestingPassedIcon = "testing-passed-icon",
	TestingQueuedIcon = "testing-queued-icon",
	TestingRunAllIcon = "testing-run-all-icon",
	TestingRunIcon = "testing-run-icon",
	TestingShowAsListIcon = "testing-show-as-list-icon",
	TestingSkippedIcon = "testing-skipped-icon",
	TestingUnsetIcon = "testing-unset-icon",
	TimelineOpen = "timeline-open",
	TimelinePin = "timeline-pin",
	TimelineRefresh = "timeline-refresh",
	TimelineUnpin = "timeline-unpin",
	TimelineViewIcon = "timeline-view-icon",
	VariablesViewIcon = "variables-view-icon",
	ViewPaneContainerCollapsed = "view-pane-container-collapsed",
	ViewPaneContainerExpanded = "view-pane-container-expanded",
	WatchExpressionsAdd = "watch-expressions-add",
	WatchExpressionsAddFunctionBreakpoint = "watch-expressions-add-function-breakpoint",
	WatchExpressionsRemoveAll = "watch-expressions-remove-all",
	WatchViewIcon = "watch-view-icon",
	WidgetClose = "widget-close"
}