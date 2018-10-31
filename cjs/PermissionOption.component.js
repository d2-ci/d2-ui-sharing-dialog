'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _d2UiCore = require('@dhis2/d2-ui-core');

var _MenuItem = require('@material-ui/core/MenuItem');

var _MenuItem2 = _interopRequireDefault(_MenuItem);

var _ListItemIcon = require('@material-ui/core/ListItemIcon');

var _ListItemIcon2 = _interopRequireDefault(_ListItemIcon);

var _ListItemText = require('@material-ui/core/ListItemText');

var _ListItemText2 = _interopRequireDefault(_ListItemText);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PermissionOption = function PermissionOption(props) {
    if (props.disabled) {
        return null;
    }

    return _react2.default.createElement(
        _MenuItem2.default,
        {
            disabled: props.disabled,
            onClick: props.onClick,
            selected: props.isSelected
        },
        props.isSelected && _react2.default.createElement(
            _ListItemIcon2.default,
            null,
            _react2.default.createElement(_d2UiCore.SvgIcon, { icon: 'Done' })
        ),
        _react2.default.createElement(_ListItemText2.default, { inset: true, primary: props.primaryText })
    );
};

PermissionOption.propTypes = {
    disabled: _propTypes2.default.bool.isRequired,
    isSelected: _propTypes2.default.bool,
    primaryText: _propTypes2.default.string.isRequired,
    onClick: _propTypes2.default.func.isRequired
};

PermissionOption.defaultProps = {
    isSelected: false
};

exports.default = PermissionOption;