/*---------------------------------------------------------
 * Copyright (C) Servable Community. All rights reserved.
 *--------------------------------------------------------*/

export default ({ className }) => {
    return {
        className,
        fields: {
        },
        classLevelPermissions: {
            find: {
                requiresAuthentication: true
            },
            count: {
                requiresAuthentication: true
            },
            get: {
                requiresAuthentication: true
            },
            create: {
                "*": true
            },
            update: {
                requiresAuthentication: true
            },
            delete: {
                requiresAuthentication: true
            },
            addField: {
                "*": true
            },
            protectedFields: {
                "*": []
            }
        },
        indexes: {
            _id_: {
                _id: 1
            }
        }
    }
}
