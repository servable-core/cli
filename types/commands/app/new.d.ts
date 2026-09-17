declare namespace _default {
    let _clinextType: string;
    let name: string;
    let position: number;
    let description: string;
    let questions: ({
        name: string;
        type: string;
        promptType: string;
        alias: string;
        defaultValue: string;
        message: string;
        validators: {
            id: string;
            params: {
                maxParams: number;
            };
        }[];
        prompt?: undefined;
        transformers?: undefined;
    } | {
        name: string;
        type: string;
        promptType: string;
        defaultValue: string;
        message: string;
        validators: {
            id: string;
            params: {
                maxParams: number;
            };
        }[];
        alias?: undefined;
        prompt?: undefined;
        transformers?: undefined;
    } | {
        name: string;
        message: string;
        validators: {
            id: string;
            params: {
                maxParams: number;
            };
        }[];
        type?: undefined;
        promptType?: undefined;
        alias?: undefined;
        defaultValue?: undefined;
        prompt?: undefined;
        transformers?: undefined;
    } | {
        name: string;
        message: string;
        type?: undefined;
        promptType?: undefined;
        alias?: undefined;
        defaultValue?: undefined;
        validators?: undefined;
        prompt?: undefined;
        transformers?: undefined;
    } | {
        name: string;
        type?: undefined;
        promptType?: undefined;
        alias?: undefined;
        defaultValue?: undefined;
        message?: undefined;
        validators?: undefined;
        prompt?: undefined;
        transformers?: undefined;
    } | {
        name: string;
        type: string;
        prompt: {
            type: string;
        };
        defaultValue: number;
        message: string;
        validators: {
            id: string;
            params: {
                maxParams: number;
            };
        }[];
        transformers: {
            modes: string[];
            id: string;
        }[];
        promptType?: undefined;
        alias?: undefined;
    })[];
    let example: string;
    function handler(): Promise<void>;
}
export default _default;
