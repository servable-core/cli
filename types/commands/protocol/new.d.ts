declare namespace _default {
    let _clinextType: string;
    let name: string;
    let description: string;
    let questions: ({
        name: string;
        validators: {
            id: string;
        }[];
        message?: undefined;
        transformers?: undefined;
    } | {
        name: string;
        message: string;
        transformers: {
            modes: string[];
            template: string;
        }[];
        validators?: undefined;
    } | {
        name: string;
        validators?: undefined;
        message?: undefined;
        transformers?: undefined;
    })[];
    let example: string;
    function handler(): Promise<void>;
}
export default _default;
