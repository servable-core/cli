declare namespace _default {
    let _clinextType: string;
    let name: string;
    let description: string;
    let questions: {
        name: string;
        message: string;
        promptType: string;
        defaultValue: boolean;
        type: string;
    }[];
    let example: string;
    function handler(): Promise<boolean>;
}
export default _default;
