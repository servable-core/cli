declare namespace _default {
    let id: string;
    function handler({ input, params }: {
        input: any;
        params: any;
    }): Promise<{
        isValid: boolean;
        message: string;
    }>;
}
export default _default;
