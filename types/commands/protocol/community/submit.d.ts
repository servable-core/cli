declare namespace _default {
    let _clinextType: string;
    let name: string;
    let description: string;
    let questions: ({
        name: string;
        message: string;
        type?: undefined;
        promptType?: undefined;
        defaultValue?: undefined;
        choices?: undefined;
    } | {
        name: string;
        type: string;
        message: string;
        promptType: string;
        defaultValue: boolean;
        choices?: undefined;
    } | {
        name: string;
        type: string;
        message: string;
        promptType: string;
        defaultValue: string;
        choices: string[];
    } | {
        name: string;
        type: string;
        message: string;
        promptType: string;
        defaultValue?: undefined;
        choices?: undefined;
    })[];
    function handler(): Promise<void>;
}
export default _default;
