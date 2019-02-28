'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _IconButton = require('@material-ui/core/IconButton');

var _IconButton2 = _interopRequireDefault(_IconButton);

var _Divider = require('@material-ui/core/Divider');

var _Divider2 = _interopRequireDefault(_Divider);

var _Popover = require('@material-ui/core/Popover');

var _Popover2 = _interopRequireDefault(_Popover);

var _NotInterested = require('@material-ui/icons/NotInterested');

var _NotInterested2 = _interopRequireDefault(_NotInterested);

var _Create = require('@material-ui/icons/Create');

var _Create2 = _interopRequireDefault(_Create);

var _Visibility = require('@material-ui/icons/Visibility');

var _Visibility2 = _interopRequireDefault(_Visibility);

var _PermissionOption = require('./PermissionOption.component');

var _PermissionOption2 = _interopRequireDefault(_PermissionOption);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = {
    optionHeader: {
        paddingLeft: 16,
        paddingTop: 16,
        fontWeight: '500',
        color: 'gray'
    }
};

var AccessIcon = function AccessIcon(_ref) {
    var metaAccess = _ref.metaAccess,
        disabled = _ref.disabled;

    var iconProps = {
        color: disabled ? "disabled" : "action"
    };
    if (metaAccess.canEdit) {
        return _react2.default.createElement(_Create2.default, iconProps);
    }

    return metaAccess.canView ? _react2.default.createElement(_Visibility2.default, iconProps) : _react2.default.createElement(_NotInterested2.default, iconProps);
};

var PermissionPicker = function (_Component) {
    (0, _inherits3.default)(PermissionPicker, _Component);

    function PermissionPicker(props, context) {
        (0, _classCallCheck3.default)(this, PermissionPicker);

        var _this = (0, _possibleConstructorReturn3.default)(this, (PermissionPicker.__proto__ || (0, _getPrototypeOf2.default)(PermissionPicker)).call(this, props));

        _this.state = {
            open: false
        };

        _this.onOptionClick = function (access) {
            return function () {
                var newAccess = (0, _extends3.default)({}, _this.props.access, access);

                _this.props.onChange(newAccess);
            };
        };

        _this.openMenu = function (event) {
            event.preventDefault();
            _this.setState({
                open: true,
                anchor: event.currentTarget
            });
        };

        _this.closeMenu = function () {
            _this.setState({
                open: false
            });
        };

        _this.translate = function (s) {
            return _this.context.d2.i18n.getTranslation(s);
        };

        _this.render = function () {
            var _this$props$access = _this.props.access,
                data = _this$props$access.data,
                meta = _this$props$access.meta;
            var _this$props$accessOpt = _this.props.accessOptions,
                dataOptions = _this$props$accessOpt.data,
                metaOptions = _this$props$accessOpt.meta;


            return _react2.default.createElement(
                _react.Fragment,
                null,
                _react2.default.createElement(
                    _IconButton2.default,
                    {
                        onClick: _this.openMenu,
                        disabled: _this.props.disabled
                    },
                    _react2.default.createElement(AccessIcon, { metaAccess: meta, disabled: _this.props.disabled })
                ),
                _react2.default.createElement(
                    _Popover2.default,
                    {
                        open: _this.state.open,
                        anchorEl: _this.state.anchor,
                        onClose: _this.closeMenu
                    },
                    _react2.default.createElement(OptionHeader, { text: _this.translate('metadata') }),
                    _react2.default.createElement(_PermissionOption2.default, {
                        disabled: !metaOptions.canEdit,
                        primaryText: _this.translate('can_edit_and_view'),
                        isSelected: meta.canEdit,
                        onClick: _this.onOptionClick({ meta: { canView: true, canEdit: true } })
                    }),
                    _react2.default.createElement(_PermissionOption2.default, {
                        disabled: !metaOptions.canView,
                        primaryText: _this.translate('can_view_only'),
                        isSelected: !meta.canEdit && meta.canView,
                        onClick: _this.onOptionClick({ meta: { canView: true, canEdit: false } })
                    }),
                    _react2.default.createElement(_PermissionOption2.default, {
                        disabled: !metaOptions.noAccess,
                        primaryText: _this.translate('no_access'),
                        isSelected: !meta.canEdit && !meta.canView,
                        onClick: _this.onOptionClick({ meta: { canView: false, canEdit: false } })
                    }),
                    _react2.default.createElement(_Divider2.default, null),
                    dataOptions && _react2.default.createElement(
                        _react.Fragment,
                        null,
                        _react2.default.createElement(OptionHeader, { text: _this.translate('data') }),
                        _react2.default.createElement(_PermissionOption2.default, {
                            disabled: !dataOptions.canEdit,
                            primaryText: _this.translate('can_capture_and_view'),
                            isSelected: data.canEdit,
                            onClick: _this.onOptionClick({
                                data: { canView: true, canEdit: true }
                            })
                        }),
                        _react2.default.createElement(_PermissionOption2.default, {
                            disabled: !dataOptions.canView,
                            primaryText: _this.translate('can_view_only'),
                            isSelected: !data.canEdit && data.canView,
                            onClick: _this.onOptionClick({
                                data: { canView: true, canEdit: false }
                            })
                        }),
                        _react2.default.createElement(_PermissionOption2.default, {
                            disabled: !dataOptions.noAccess,
                            primaryText: _this.translate('no_access'),
                            isSelected: !data.canEdit && !data.canView,
                            onClick: _this.onOptionClick({
                                data: {
                                    canView: false,
                                    canEdit: false
                                }
                            })
                        })
                    )
                )
            );
        };

        context.d2.i18n.addStrings(['can_edit_and_view', 'can_capture_and_view', 'can_view_only', 'no_access']);
        return _this;
    }

    return PermissionPicker;
}(_react.Component);

PermissionPicker.propTypes = {
    access: _propTypes2.default.object.isRequired,
    accessOptions: _propTypes2.default.object.isRequired,
    onChange: _propTypes2.default.func.isRequired,
    disabled: _propTypes2.default.bool
};

PermissionPicker.defaultProps = {
    disabled: false
};

PermissionPicker.contextTypes = {
    d2: _propTypes2.default.object.isRequired
};

var OptionHeader = function OptionHeader(_ref2) {
    var text = _ref2.text;
    return _react2.default.createElement(
        'div',
        { style: styles.optionHeader },
        text.toUpperCase()
    );
};

OptionHeader.propTypes = {
    text: _propTypes2.default.string.isRequired
};

exports.default = PermissionPicker;