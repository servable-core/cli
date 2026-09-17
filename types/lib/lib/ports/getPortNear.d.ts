declare function _default({ port, maxRange, exclude, host }: {
    port: number;
    maxRange?: number;
    exclude?: number[];
    host?: string;
}): Promise<number>;
export default _default;
