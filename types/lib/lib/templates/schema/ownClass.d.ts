declare function _default({ className }: {
    className: any;
}): {
    className: any;
    fields: {};
    classLevelPermissions: {
        find: {
            requiresAuthentication: boolean;
        };
        count: {
            requiresAuthentication: boolean;
        };
        get: {
            requiresAuthentication: boolean;
        };
        create: {
            "*": boolean;
        };
        update: {
            requiresAuthentication: boolean;
        };
        delete: {
            requiresAuthentication: boolean;
        };
        addField: {
            "*": boolean;
        };
        protectedFields: {
            "*": any[];
        };
    };
    indexes: {
        _id_: {
            _id: number;
        };
    };
};
export default _default;
