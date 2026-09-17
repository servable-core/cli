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
    } | {
        name: string;
        message?: undefined;
        type?: undefined;
        promptType?: undefined;
        defaultValue?: undefined;
    } | {
        name: string;
        type: string;
        promptType: string;
        defaultValue: boolean;
        message: string;
    })[];
    let example: string;
    function handler(): Promise<void>;
}
export default _default;
