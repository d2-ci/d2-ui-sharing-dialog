'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.PublicAccess = exports.ExternalAccess = exports.GroupAccess = exports.Access = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _compose = require('recompose/compose');

var _compose2 = _interopRequireDefault(_compose);

var _mapProps = require('recompose/mapProps');

var _mapProps2 = _interopRequireDefault(_mapProps);

var _getContext = require('recompose/getContext');

var _getContext2 = _interopRequireDefault(_getContext);

var _withProps = require('recompose/withProps');

var _withProps2 = _interopRequireDefault(_withProps);

var _IconButton = require('@material-ui/core/IconButton');

var _IconButton2 = _interopRequireDefault(_IconButton);

var _d2UiCore = require('@dhis2/d2-ui-core');

var _Clear = require('@material-ui/icons/Clear');

var _Clear2 = _interopRequireDefault(_Clear);

var _PermissionPicker = require('./PermissionPicker.component');

var _PermissionPicker2 = _interopRequireDefault(_PermissionPicker);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
    d2: _propTypes2.default.object.isRequired
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
    return (0, _extends3.default)({}, props, {
        access: (0, _utils.accessStringToObject)(props.access),
        onChange: function onChange(newAccess) {
            return props.onChange((0, _utils.accessObjectToString)(newAccess));
        }
    });
};

var Access = exports.Access = function Access(_ref) {
    var access = _ref.access,
        accessType = _ref.accessType,
        accessOptions = _ref.accessOptions,
        primaryText = _ref.primaryText,
        secondaryText = _ref.secondaryText,
        onChange = _ref.onChange,
        onRemove = _ref.onRemove,
        disabled = _ref.disabled;
    return _react2.default.createElement(
        'div',
        { style: styles.accessView },
        _react2.default.createElement(_d2UiCore.SvgIcon, { icon: getAccessIcon(accessType) }),
        _react2.default.createElement(
            'div',
            { style: styles.accessDescription },
            _react2.default.createElement(
                'div',
                null,
                primaryText
            ),
            _react2.default.createElement(
                'div',
                { style: { color: '#818181', paddingTop: 4 } },
                secondaryText || ' '
            )
        ),
        _react2.default.createElement(_PermissionPicker2.default, {
            access: access,
            accessOptions: accessOptions,
            onChange: onChange,
            disabled: disabled
        }),
        _react2.default.createElement(
            _IconButton2.default,
            {
                disabled: !onRemove,
                onClick: onRemove || function () {}
            },
            _react2.default.createElement(_Clear2.default, { color: !onRemove ? "disabled" : "action" })
        )
    );
};

Access.contextTypes = d2Context;

Access.propTypes = {
    access: _propTypes2.default.object.isRequired,
    accessType: _propTypes2.default.string.isRequired,
    accessOptions: _propTypes2.default.object.isRequired,
    primaryText: _propTypes2.default.string.isRequired,
    onChange: _propTypes2.default.func.isRequired,
    disabled: _propTypes2.default.bool,
    secondaryText: _propTypes2.default.string,
    onRemove: _propTypes2.default.func
};

Access.defaultProps = {
    secondaryText: undefined,
    onRemove: undefined,
    disabled: false
};

var GroupAccess = exports.GroupAccess = (0, _compose2.default)((0, _mapProps2.default)(useAccessObjectFormat), (0, _withProps2.default)(function (props) {
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

var ExternalAccess = exports.ExternalAccess = (0, _compose2.default)((0, _getContext2.default)(d2Context), (0, _withProps2.default)(function (props) {
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

var PublicAccess = exports.PublicAccess = (0, _compose2.default)((0, _mapProps2.default)(useAccessObjectFormat), (0, _getContext2.default)(d2Context), (0, _withProps2.default)(function (props) {
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