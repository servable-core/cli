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
    } | {
        name: string;
        message: string;
        validators?: undefined;
    })[];
    let example: string;
    function handler(): Promise<void>;
}
export default _default;
