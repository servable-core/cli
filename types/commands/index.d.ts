declare namespace _default {
    let _clinextType: string;
    let name: string;
    let description: string;
    let questions: {
        name: string;
        type: string;
        alias: string;
        description: string;
        global: boolean;
    }[];
    let example: string;
    function handler(): Promise<void>;
}
export default _default;
