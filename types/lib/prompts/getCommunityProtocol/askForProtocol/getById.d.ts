declare function _default({ id }: {
    id: any;
}): Promise<{
    id: string;
    name: string;
    version: string;
    apiVersion: string;
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
        github?: undefined;
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
    api: {
        template: {
            id: string;
            name: string;
            slug: string;
            params: {
                apiKey: string;
                liveClasses: string[];
                schema: {
                    restrictSecurity: boolean;
                };
            };
        };
        parameters: {
            id: string;
            prompt: {
                type: string;
                name: string;
                message: string;
                default: string;
                vacuity: string;
                validators: {
                    type: string;
                    params: {};
                }[];
            };
        }[];
    };
    forks?: undefined;
    email?: undefined;
} | {
    id: string;
    name: string;
    version: string;
    description: string;
    homepage: string;
    license: string;
    icon: string;
    author: {
        name: string;
        email: string;
        url: string;
        github: string;
    };
    keywords: string[];
    forks: {};
    packages: {
        id: string;
        description: string;
        type: string;
        components: string[];
        url: string;
        engines: {
            "@servable/engine": string;
        };
        usage: {
            howto: string;
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
                    };
                };
            };
            parameters: ({
                id: string;
                prompt: {
                    type: string;
                    name: string;
                    message: string;
                    vacuity: string;
                    validators: {
                        type: string;
                        params: {};
                    }[];
                    transformer: (a: any) => any;
                    default?: undefined;
                };
            } | {
                id: string;
                prompt: {
                    type: string;
                    message: string;
                    default: string;
                    vacuity: string;
                    validators: {
                        type: string;
                        params: {};
                    }[];
                    name?: undefined;
                    transformer?: undefined;
                };
            } | {
                id: string;
                prompt: {
                    type: string;
                    message: string;
                    default: boolean;
                    vacuity: string;
                    validators: {
                        type: string;
                        params: {};
                    }[];
                    name?: undefined;
                    transformer?: undefined;
                };
            } | {
                id: string;
                prompt: {
                    type: string;
                    message: string;
                    vacuity: string;
                    validators: {
                        type: string;
                        params: {};
                    }[];
                    name?: undefined;
                    transformer?: undefined;
                    default?: undefined;
                };
            })[];
        };
        dependencies: {};
    }[];
    apiVersion?: undefined;
    repository?: undefined;
    bugs?: undefined;
    main?: undefined;
    engines?: undefined;
    api?: undefined;
    email?: undefined;
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
    apiVersion?: undefined;
    keywords?: undefined;
    repository?: undefined;
    bugs?: undefined;
    main?: undefined;
    homepage?: undefined;
    license?: undefined;
    engines?: undefined;
    api?: undefined;
    forks?: undefined;
}>;
export default _default;
