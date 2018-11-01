import _extends from 'babel-runtime/helpers/extends';
import PropTypes from 'prop-types';
import React from 'react';
import compose from 'recompose/compose';
import mapProps from 'recompose/mapProps';
import getContext from 'recompose/getContext';
import withProps from 'recompose/withProps';
import IconButton from '@material-ui/core/IconButton';
import { SvgIcon } from '@dhis2/d2-ui-core';
import ClearIcon from '@material-ui/icons/Clear';
import PermissionPicker from './PermissionPicker.component';
import { accessStringToObject, accessObjectToString } from './utils';

var styles = {
    accessView: {
        fontWeight: '400',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '4px 8px'
    },
    accessDescription: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        paddingLeft: 16
    }
};

var d2Context = {
    d2: PropTypes.object.isRequired
};

var getAccessIcon = function getAccessIcon(userType) {
    switch (userType) {
        case 'user':
            return 'Person';
        case 'userGroup':
            return 'Group';
        case 'external':
            return 'Public';
        case 'public':
            return 'Business';
        default:
            return 'Person';
    }
};

var useAccessObjectFormat = function useAccessObjectFormat(props) {
    return _extends({}, props, {
        access: accessStringToObject(props.access),
        onChange: function onChange(newAccess) {
            return props.onChange(accessObjectToString(newAccess));
        }
    });
};

export var Access = function Access(_ref) {
    var access = _ref.access,
        accessType = _ref.accessType,
        accessOptions = _ref.accessOptions,
        primaryText = _ref.primaryText,
        secondaryText = _ref.secondaryText,
        onChange = _ref.onChange,
        onRemove = _ref.onRemove,
        disabled = _ref.disabled;
    return React.createElement(
        'div',
        { style: styles.accessView },
        React.createElement(SvgIcon, { icon: getAccessIcon(accessType) }),
        React.createElement(
            'div',
            { style: styles.accessDescription },
            React.createElement(
                'div',
                null,
                primaryText
            ),
            React.createElement(
                'div',
                { style: { color: '#818181', paddingTop: 4 } },
                secondaryText || ' '
            )
        ),
        React.createElement(PermissionPicker, {
            access: access,
            accessOptions: accessOptions,
            onChange: onChange,
            disabled: disabled
        }),
        React.createElement(
            IconButton,
            {
                disabled: !onRemove,
                onClick: onRemove || function () {}
            },
            React.createElement(ClearIcon, { color: !onRemove ? "disabled" : "action" })
        )
    );
};

Access.contextTypes = d2Context;

Access.propTypes = {
    access: PropTypes.object.isRequired,
    accessType: PropTypes.string.isRequired,
    accessOptions: PropTypes.object.isRequired,
    primaryText: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
    secondaryText: PropTypes.string,
    onRemove: PropTypes.func
};

Access.defaultProps = {
    secondaryText: undefined,
    onRemove: undefined,
    disabled: false
};

export var GroupAccess = compose(mapProps(useAccessObjectFormat), withProps(function (props) {
    return {
        accessType: props.groupType,
        primaryText: props.groupName,
        accessOptions: {
            meta: { canView: true, canEdit: true, noAccess: false },
            data: props.dataShareable && {
                canView: true,
                canEdit: true,
                noAccess: true
            }
        }
    };
}))(Access);

export var ExternalAccess = compose(getContext(d2Context), withProps(function (props) {
    props.d2.i18n.addStrings(['public_access', 'external_access', 'anyone_can_view_without_a_login', 'anyone_can_find_view_and_edit', 'anyone_can_find_and_view', 'no_access']);

    return {
        accessType: 'external',
        primaryText: props.d2.i18n.getTranslation('external_access'),
        secondaryText: props.access ? props.d2.i18n.getTranslation('anyone_can_view_without_a_login') : props.d2.i18n.getTranslation('no_access'),
        access: {
            meta: { canEdit: false, canView: props.access },
            data: { canEdit: false, canView: false }
        },
        onChange: function onChange(newAccess) {
            return props.onChange(newAccess.meta.canView);
        },
        accessOptions: {
            meta: { canView: true, canEdit: false, noAccess: true }
        }
    };
}))(Access);

var constructSecondaryText = function constructSecondaryText(_ref2) {
    var canView = _ref2.canView,
        canEdit = _ref2.canEdit;

    if (canEdit) {
        return 'anyone_can_find_view_and_edit';
    }

    return canView ? 'anyone_can_find_and_view' : 'no_access';
};

export var PublicAccess = compose(mapProps(useAccessObjectFormat), getContext(d2Context), withProps(function (props) {
    props.d2.i18n.addStrings(['public_access', 'external_access', 'anyone_can_view_without_a_login', 'anyone_can_find_view_and_edit', 'anyone_can_find_and_view', 'no_access']);
    return {
        accessType: 'public',
        primaryText: props.d2.i18n.getTranslation('public_access'),
        secondaryText: props.d2.i18n.getTranslation(constructSecondaryText(props.access.meta)),
        accessOptions: {
            meta: { canView: true, canEdit: true, noAccess: true },
            data: props.dataShareable && {
                canView: true,
                canEdit: true,
                noAccess: true
            }
        }
    };
}))(Access);