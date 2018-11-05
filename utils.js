export var cachedAccessTypeToString = function cachedAccessTypeToString(canView, canEdit) {
    if (canView) {
        return canEdit ? 'rw------' : 'r-------';
    }

    return '--------';
};

export var transformAccessObject = function transformAccessObject(access, type) {
    return {
        id: access.id,
        name: access.name,
        displayName: access.displayName,
        type: type,
        canView: access.access && access.access.includes('r'),
        canEdit: access.access && access.access.includes('rw')
    };
};

export var accessStringToObject = function accessStringToObject(access) {
    if (!access) {
        return {
            data: { canView: false, canEdit: false },
            meta: { canView: false, canEdit: false }
        };
    }

    var metaAccess = access.substring(0, 2);
    var dataAccess = access.substring(2, 4);

    return {
        meta: {
            canView: metaAccess.includes('r'),
            canEdit: metaAccess.includes('rw')
        },
        data: {
            canView: dataAccess.includes('r'),
            canEdit: dataAccess.includes('rw')
        }
    };
};

export var accessObjectToString = function accessObjectToString(accessObject) {
    var convert = function convert(_ref) {
        var canEdit = _ref.canEdit,
            canView = _ref.canView;

        if (canEdit) {
            return 'rw';
        }

        return canView ? 'r-' : '--';
    };

    var accessString = '';
    accessString += convert(accessObject.meta);
    accessString += convert(accessObject.data);
    accessString += '----';

    return accessString;
};