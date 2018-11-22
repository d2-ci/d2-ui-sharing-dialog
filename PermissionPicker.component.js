import _extends from 'babel-runtime/helpers/extends';
import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import Popover from '@material-ui/core/Popover';
import NotInterestedIcon from '@material-ui/icons/NotInterested';
import CreateIcon from '@material-ui/icons/Create';
import VisibilityIcon from '@material-ui/icons/Visibility';

import PermissionOption from './PermissionOption.component';

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
        return React.createElement(CreateIcon, iconProps);
    }

    return metaAccess.canView ? React.createElement(VisibilityIcon, iconProps) : React.createElement(NotInterestedIcon, iconProps);
};

var PermissionPicker = function (_Component) {
    _inherits(PermissionPicker, _Component);

    function PermissionPicker(props, context) {
        _classCallCheck(this, PermissionPicker);

        var _this = _possibleConstructorReturn(this, (PermissionPicker.__proto__ || _Object$getPrototypeOf(PermissionPicker)).call(this, props));

        _this.state = {
            open: false
        };

        _this.onOptionClick = function (access) {
            return function () {
                var newAccess = _extends({}, _this.props.access, access);

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


            return React.createElement(
                Fragment,
                null,
                React.createElement(
                    IconButton,
                    {
                        onClick: _this.openMenu,
                        disabled: _this.props.disabled
                    },
                    React.createElement(AccessIcon, { metaAccess: meta, disabled: _this.props.disabled })
                ),
                React.createElement(
                    Popover,
                    {
                        open: _this.state.open,
                        anchorEl: _this.state.anchor,
                        onClose: _this.closeMenu
                    },
                    React.createElement(OptionHeader, { text: _this.translate('metadata') }),
                    React.createElement(PermissionOption, {
                        disabled: !metaOptions.canEdit,
                        primaryText: _this.translate('can_edit_and_view'),
                        isSelected: meta.canEdit,
                        onClick: _this.onOptionClick({ meta: { canView: true, canEdit: true } })
                    }),
                    React.createElement(PermissionOption, {
                        disabled: !metaOptions.canView,
                        primaryText: _this.translate('can_view_only'),
                        isSelected: !meta.canEdit && meta.canView,
                        onClick: _this.onOptionClick({ meta: { canView: true, canEdit: false } })
                    }),
                    React.createElement(PermissionOption, {
                        disabled: !metaOptions.noAccess,
                        primaryText: _this.translate('no_access'),
                        isSelected: !meta.canEdit && !meta.canView,
                        onClick: _this.onOptionClick({ meta: { canView: false, canEdit: false } })
                    }),
                    React.createElement(Divider, null),
                    dataOptions && React.createElement(
                        Fragment,
                        null,
                        React.createElement(OptionHeader, { text: _this.translate('data') }),
                        React.createElement(PermissionOption, {
                            disabled: !dataOptions.canEdit,
                            primaryText: _this.translate('can_capture_and_view'),
                            isSelected: data.canEdit,
                            onClick: _this.onOptionClick({
                                data: { canView: true, canEdit: true }
                            })
                        }),
                        React.createElement(PermissionOption, {
                            disabled: !dataOptions.canView,
                            primaryText: _this.translate('can_view_only'),
                            isSelected: !data.canEdit && data.canView,
                            onClick: _this.onOptionClick({
                                data: { canView: true, canEdit: false }
                            })
                        }),
                        React.createElement(PermissionOption, {
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
}(Component);

PermissionPicker.propTypes = {
    access: PropTypes.object.isRequired,
    accessOptions: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    disabled: PropTypes.bool
};

PermissionPicker.defaultProps = {
    disabled: false
};

PermissionPicker.contextTypes = {
    d2: PropTypes.object.isRequired
};

var OptionHeader = function OptionHeader(_ref2) {
    var text = _ref2.text;
    return React.createElement(
        'div',
        { style: styles.optionHeader },
        text.toUpperCase()
    );
};

OptionHeader.propTypes = {
    text: PropTypes.string.isRequired
};

export default PermissionPicker;