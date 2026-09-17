declare namespace _default {
    let _clinextType: string;
    let name: string;
    let description: string;
    let questions: ({
        name: string;
        storeValue: boolean;
        loadValueFromStore: boolean;
        storeDomain: any;
    } | {
        name: string;
        storeDomain: any;
        storeValue?: undefined;
        loadValueFromStore?: undefined;
    })[];
    let example: string;
    function handler(): Promise<void>;
}
export default _default;
