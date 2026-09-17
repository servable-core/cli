declare const _default: ({
    id: string;
    name: string;
    version: string;
    description: string;
    packages: ({
        id: string;
        description: string;
        type: string;
        components: string[];
        url: string;
    } | {
        id: string;
        description: string;
        type: string;
        components: string[];
        url?: undefined;
    })[];
    author: {
        name: string;
        email: string;
        url: string;
    };
    keywords: string[];
    repository: {
        type: string;
        url: string;
    };
    bugs: {
        url: string;
    };
    main: string;
    homepage: string;
    license: string;
    engines: {
        node: string;
    };
    icon: string;
    declaration: {
        template: {
            id: string;
            name: string;
            slug: string;
            params: {
                apiKey: string;
                liveClasses: string[];
                schema: {
                    restrictSecurity: boolean;
                    exclude?: undefined;
                };
                frontWebUrl?: undefined;
                env?: undefined;
                appName?: undefined;
                restrictSend?: undefined;
                restrictTo?: undefined;
                restrictToRegex?: undefined;
            };
        };
        parameters: {
            id: string;
            prompt: {
                type: string;
                name: string;
                message: string;
                default: string;
                validate: {
                    type: string;
                    params: {};
                };
            };
        }[];
    };
    howto?: undefined;
    email?: undefined;
} | {
    id: string;
    name: string;
    version: string;
    description: string;
    howto: string;
    packages: {
        id: string;
        description: string;
        type: string;
        components: string[];
        url: string;
    }[];
    author: {
        name: string;
        email: string;
        url: string;
    };
    keywords: string[];
    repository: {
        type: string;
        url: string;
    };
    bugs: {
        url: string;
    };
    main: string;
    homepage: string;
    license: string;
    engines: {
        node: string;
    };
    email: string;
    icon: string;
    declaration: {
        template: {
            id: string;
            name: string;
            slug: string;
            params: {
                apiKey: string;
                frontWebUrl: string;
                env: any;
                appName: any;
                restrictSend: string;
                restrictTo: string;
                restrictToRegex: string;
                schema: {
                    exclude: boolean;
                    restrictSecurity?: undefined;
                };
                liveClasses?: undefined;
            };
        };
        parameters: ({
            id: string;
            prompt: {
                type: string;
                name: string;
                message: string;
                default: string;
                validate: {
                    type: string;
                    params: {};
                };
            };
        } | {
            id: string;
            prompt: {
                type: string;
                message: string;
                default: string;
                validate: {
                    type: string;
                    params: {};
                };
                name?: undefined;
            };
        })[];
    };
} | {
    id: string;
    name: string;
    packages: {
        id: string;
        description: string;
        type: string;
    }[];
    author: string;
    email: string;
    description: string;
    icon: string;
    version?: undefined;
    keywords?: undefined;
    repository?: undefined;
    bugs?: undefined;
    main?: undefined;
    homepage?: undefined;
    license?: undefined;
    engines?: undefined;
    declaration?: undefined;
    howto?: undefined;
})[];
export default _default;
