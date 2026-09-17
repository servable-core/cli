declare namespace _default {
    let _clinextType: string;
    let name: string;
    let description: string;
    let questions: {
        name: string;
        type: string;
        description: string;
    }[];
    let example: string;
    function handler({ toolbox }?: {
        toolbox?: {
            payload?: {
                reason?: string;
                force?: boolean;
            };
        };
    }): Promise<void>;
}
export default _default;
