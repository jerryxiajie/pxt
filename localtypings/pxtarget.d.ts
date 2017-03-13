/// <reference path="pxtpackage.d.ts" />
/// <reference path="pxtparts.d.ts" />
/// <reference path="blockly.d.ts" />

declare namespace pxt {
    // targetconfig.json
    interface TargetConfig {
        packages?: PackagesConfig;
    }

    interface PackagesConfig {
        approvedOrgs?: string[];
        approvedRepos?: string[];
        bannedOrgs?: string[];
        bannedRepos?: string[];
    }

    interface AppTarget {
        id: string; // has to match ^[a-z]+$; used in URLs and domain names
        nickname?: string; // friendly id used when generating files, folders, etc... id is used instead if missing
        name: string;
        description?: string;
        corepkg: string;
        title?: string;
        cloud?: AppCloud;
        simulator?: AppSimulator;
        blocksprj: ProjectTemplate;
        tsprj: ProjectTemplate;
        runtime?: RuntimeOptions;
        compile: ts.pxtc.CompileTarget;
        serial?: AppSerial;
        appTheme: AppTheme;
        compileService?: TargetCompileService;
        analytics?: AppAnalytics;
    }

    interface ProjectTemplate {
        id: string;
        config: PackageConfig;
        files: Map<string>;
    }

    interface BlockToolboxDefinition {
        namespace: string;
        type: string;
        gap?: number;
        weight?: number;
        fields?: Map<string>;
    }

    interface RuntimeOptions {
        mathBlocks?: boolean;
        textBlocks?: boolean;
        listsBlocks?: boolean;
        variablesBlocks?: boolean;
        logicBlocks?: boolean;
        loopsBlocks?: boolean;
        extraBlocks?: BlockToolboxDefinition[];
        onStartNamespace?: string; // default = loops
        onStartColor?: string;
        onStartWeight?: number;
    }

    interface AppAnalytics {
        userVoiceApiKey?: string;
        userVoiceForumId?: number;
    }

    interface AppSerial {
        useHF2?: boolean;
        manufacturerFilter?: string; // used by node-serial
        nameFilter?: string; // regex to match devices
        log?: boolean;
    }

    interface AppCloud {
        workspaces?: boolean;
        packages?: boolean;
        publishing?: boolean;
        sharing?: boolean; // uses cloud-based anonymous sharing
        importing?: boolean; // import url dialog
        embedding?: boolean;
        preferredPackages?: string[]; // list of company/project(#tag) of packages
        githubPackages?: boolean; // allow searching github for packages
    }

    interface AppSimulator {
        autoRun?: boolean;
        stopOnChange?: boolean;
        hideRestart?: boolean;
        hideFullscreen?: boolean;
        hideRecorder?: boolean;
        streams?: boolean;
        aspectRatio?: number; // width / height
        boardDefinition?: pxsim.BoardDefinition;
        parts?: boolean; // parts enabled?
        instructions?: boolean;
        partsAspectRatio?: number; // aspect ratio of the simulator when parts are displayed
        headless?: boolean; // whether simulator should still run while collapsed
    }

    interface TargetCompileService {
        yottaTarget?: string; // bbc-microbit-classic-gcc
        yottaBinary?: string; // defaults to "pxt-microbit-app-combined.hex"
        yottaCorePackage?: string; // pxt-microbit-core
        yottaConfig?: any; // additional config
        githubCorePackage?: string; // microsoft/pxt-microbit-core
        platformioIni?: string[];
        gittag: string;
        serviceId: string;
        buildEngine?: string;  // default is yotta, set to platformio
    }

    interface SpecializedResource {
        name: string,
        browser?: string,
        os?: string,
        path: string
    }

    interface AppTheme {
        id?: string;
        name?: string;
        title?: string;
        description?: string;
        twitter?: string;
        defaultLocale?: string;
        logoUrl?: string;
        logo?: string;
        portraitLogo?: string;
        rightLogo?: string;
        docsLogo?: string;
        organization?: string;
        organizationUrl?: string;
        organizationLogo?: string;
        organizationWideLogo?: string;
        homeUrl?: string;
        embedUrl?: string;
        legacyDomain?: string;
        docMenu?: DocMenuEntry[];
        TOC?: TOCMenuEntry[];
        hideSideDocs?: boolean;
        sideDoc?: string; // if set: show the getting started button, clicking on getting started button links to that page
        hasReferenceDocs?: boolean; // if true: the monaco editor will add an option in the context menu to load the reference docs
        feedbackUrl?: string; // is set: a feedback link will show in the settings menu
        boardName?: string;
        privacyUrl?: string;
        termsOfUseUrl?: string;
        contactUrl?: string;
        accentColor?: string;
        locales?: Map<AppTheme>;
        cardLogo?: string;
        appLogo?: string;
        htmlDocIncludes?: Map<string>;
        htmlTemplates?: Map<string>;
        githubUrl?: string;
        usbDocs?: string;
        exportVsCode?: boolean;
        browserSupport?: SpecializedResource[];
        layoutOptions?: LayoutOptions;
        invertedMenu?: boolean; // if true: apply the inverted class to the menu
        coloredToolbox?: boolean; // if true: color the blockly toolbox categories
        invertedToolbox?: boolean; // if true: use the blockly inverted toolbox
        invertedMonaco?: boolean; // if true: use the vs-dark monaco theme
        blocklyOptions?: Blockly.Options; // Blockly options, see Configuration: https://developers.google.com/blockly/guides/get-started/web
        simAnimationEnter?: string; // Simulator enter animation
        simAnimationExit?: string; // Simulator exit animation
        hasAudio?: boolean; // target uses the Audio manager. if true: a mute button is added to the simulator toolbar.
        projectGallery?: string;
        exampleGallery?: string;
        crowdinProject?: string;
        crowdinBranch?: string; // optional branch specification
        monacoToolbox?: boolean; // if true: show the monaco toolbox when in the monaco editor
        blockHats?: boolean; // if true, event blocks have hats
        allowParentController?: boolean; // allow parent iframe to control editor
        blocksOnly?: boolean; // blocks only workspace
    }

    interface LayoutOptions {
        hideMenuBar?: boolean; // Hides the main menu bar
    }

    interface DocMenuEntry {
        name: string;
        // needs to have one of `path` or `subitems`
        path?: string;
        tutorial?: boolean;
        subitems?: DocMenuEntry[];
    }

    interface TOCMenuEntry {
        name: string;
        path?: string;
        subitems?: TOCMenuEntry[];

        prevName?: string;
        prevPath?: string;

        nextName?: string;
        nextPath?: string;
    }

    interface TargetBundle extends AppTarget {
        bundledpkgs: Map<Map<string>>;
        bundleddirs: string[];
        versions: TargetVersions;
    }
}

declare namespace ts.pxtc {
    interface CompileTarget {
        isNative: boolean; // false -> JavaScript for simulator
        nativeType?: string; // currently only "thumb"
        hasHex: boolean;
        useUF2?: boolean;
        hexMimeType?: string;
        driveName?: string;
        jsRefCounting?: boolean;
        floatingPoint?: boolean;
        deployDrives?: string; // partial name of drives where the .hex file should be copied
        deployFileMarker?: string;
        shortPointers?: boolean; // set to true for 16 bit pointers
        flashCodeAlign?: number; // defaults to 1k
        upgrades?: UpgradePolicy[];
        openocdScript?: string;
        flashChecksumAddr?: number;
    }

    interface CompileOptions {
        fileSystem: pxt.Map<string>;
        target: CompileTarget;
        testMode?: boolean;
        sourceFiles?: string[];
        hexinfo: HexInfo;
        extinfo?: ExtensionInfo;
        noEmit?: boolean;
        forceEmit?: boolean;
        ast?: boolean;
        breakpoints?: boolean;
        justMyCode?: boolean;
        computeUsedSymbols?: boolean;

        embedMeta?: string;
        embedBlob?: string; // base64
    }

    interface UpgradePolicy {
        type: string;
        map?: pxt.Map<string>;
    }

    interface FuncInfo {
        name: string;
        type: string;
        args: number;
        value: number;
    }

    interface ExtensionInfo {
        functions: FuncInfo[];
        generatedFiles: pxt.Map<string>;
        extensionFiles: pxt.Map<string>;
        yotta?: pxt.YottaConfig;
        platformio?: pxt.PlatformIOConfig;
        sha: string;
        compileData: string;
        shimsDTS: string;
        enumsDTS: string;
        onlyPublic: boolean;
    }

    interface HexInfo {
        hex: string[];
    }
}
