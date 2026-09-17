declare namespace _default {
    let type: string;
    let modes: string[];
    let id: string;
    function handler({ toolbox, question, item }: {
        toolbox: any;
        question: any;
        item: any;
    }): Promise<any>;
}
export default _default;
