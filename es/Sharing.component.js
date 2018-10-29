import _toConsumableArray from 'babel-runtime/helpers/toConsumableArray';
import _extends from 'babel-runtime/helpers/extends';
import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import PropTypes from 'prop-types';
import React from 'react';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import { Heading } from '@dhis2/d2-ui-core';
import UserSearch from './UserSearch.component';
import CreatedBy from './CreatedBy.component';
import { PublicAccess, ExternalAccess, GroupAccess } from './Access.component';

var styles = {
    createdBy: {
        color: '#818181'
    },
    titleBodySpace: {
        paddingTop: 30
    },
    rules: {
        height: '240px',
        overflowY: 'scroll'
    }
};

/**
 * Content of the sharing dialog; a set of components for changing sharing
 * preferences.
 */

var Sharing = function (_React$Component) {
    _inherits(Sharing, _React$Component);

    function Sharing(props, context) {
        _classCallCheck(this, Sharing);

        var _this = _possibleConstructorReturn(this, (Sharing.__proto__ || _Object$getPrototypeOf(Sharing)).call(this, props));

        _this.onAccessRuleChange = function (id) {
            return function (accessRule) {
                var changeWithId = function changeWithId(rule) {
                    return rule.id === id ? _extends({}, rule, { access: accessRule }) : rule;
                };
                var userAccesses = (_this.props.sharedObject.object.userAccesses || []).map(changeWithId);
                var userGroupAccesses = (_this.props.sharedObject.object.userGroupAccesses || []).map(changeWithId);

                _this.props.onChange({
                    userAccesses: userAccesses,
                    userGroupAccesses: userGroupAccesses
                });
            };
        };

        _this.onAccessRemove = function (accessOwnerId) {
            return function () {
                var withoutId = function withoutId(accessOwner) {
                    return accessOwner.id !== accessOwnerId;
                };
                var userAccesses = (_this.props.sharedObject.object.userAccesses || []).filter(withoutId);
                var userGroupAccesses = (_this.props.sharedObject.object.userGroupAccesses || []).filter(withoutId);

                _this.props.onChange({
                    userAccesses: userAccesses,
                    userGroupAccesses: userGroupAccesses
                });
            };
        };

        _this.onPublicAccessChange = function (publicAccess) {
            _this.props.onChange({
                publicAccess: publicAccess
            });
        };

        _this.onExternalAccessChange = function (externalAccess) {
            _this.props.onChange({
                externalAccess: externalAccess
            });
        };

        _this.setAccessListRef = function (ref) {
            _this.accessListRef = ref;
        };

        _this.accessListRef = null;

        _this.addUserAccess = function (userAccess) {
            var currentAccesses = _this.props.sharedObject.object.userAccesses || [];
            _this.props.onChange({
                userAccesses: [].concat(_toConsumableArray(currentAccesses), [userAccess])
            }, _this.scrollAccessListToBottom());
        };

        _this.addUserGroupAccess = function (userGroupAccess) {
            var currentAccesses = _this.props.sharedObject.object.userGroupAccesses || [];
            _this.props.onChange({
                userGroupAccesses: [].concat(_toConsumableArray(currentAccesses), [userGroupAccess])
            }, _this.scrollAccessListToBottom());
        };

        _this.scrollAccessListToBottom = function () {
            _this.accessListRef.scrollTop = _this.accessListRef.scrollHeight;
        };

        context.d2.i18n.addStrings(['who_has_access']);
        return _this;
    }

    _createClass(Sharing, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _props$sharedObject$o = this.props.sharedObject.object,
                user = _props$sharedObject$o.user,
                displayName = _props$sharedObject$o.displayName,
                userAccesses = _props$sharedObject$o.userAccesses,
                userGroupAccesses = _props$sharedObject$o.userGroupAccesses,
                publicAccess = _props$sharedObject$o.publicAccess,
                externalAccess = _props$sharedObject$o.externalAccess;
            var _props$sharedObject$m = this.props.sharedObject.meta,
                allowPublicAccess = _props$sharedObject$m.allowPublicAccess,
                allowExternalAccess = _props$sharedObject$m.allowExternalAccess;


            var accessIds = (userAccesses || []).map(function (access) {
                return access.id;
            }).concat((userGroupAccesses || []).map(function (access) {
                return access.id;
            }));

            return React.createElement(
                'div',
                null,
                React.createElement(Heading, { text: displayName, level: 2 }),
                React.createElement(CreatedBy, { author: user }),
                React.createElement('div', { style: styles.titleBodySpace }),
                React.createElement(
                    Typography,
                    { variant: 'subheading' },
                    this.context.d2.i18n.getTranslation('who_has_access')
                ),
                React.createElement(Divider, null),
                React.createElement(
                    'div',
                    { style: styles.rules, ref: this.setAccessListRef },
                    React.createElement(PublicAccess, {
                        access: publicAccess,
                        disabled: !allowPublicAccess,
                        dataShareable: this.props.dataShareable,
                        onChange: this.onPublicAccessChange
                    }),
                    React.createElement(Divider, null),
                    React.createElement(ExternalAccess, {
                        access: externalAccess,
                        disabled: !allowExternalAccess,
                        onChange: this.onExternalAccessChange
                    }),
                    React.createElement(Divider, null),
                    userAccesses && userAccesses.map(function (access) {
                        return React.createElement(
                            'div',
                            { key: access.id },
                            React.createElement(GroupAccess, {
                                groupName: access.displayName,
                                groupType: 'user',
                                access: access.access,
                                dataShareable: _this2.props.dataShareable,
                                onRemove: _this2.onAccessRemove(access.id),
                                onChange: _this2.onAccessRuleChange(access.id)
                            }),
                            React.createElement(Divider, null)
                        );
                    }),
                    userGroupAccesses && userGroupAccesses.map(function (access) {
                        return React.createElement(
                            'div',
                            { key: access.id },
                            React.createElement(GroupAccess, {
                                access: access.access,
                                groupName: access.displayName,
                                groupType: 'userGroup',
                                dataShareable: _this2.props.dataShareable,
                                onRemove: _this2.onAccessRemove(access.id),
                                onChange: _this2.onAccessRuleChange(access.id)
                            }),
                            React.createElement(Divider, null)
                        );
                    })
                ),
                React.createElement(UserSearch, {
                    onSearch: this.props.onSearch,
                    addUserAccess: this.addUserAccess,
                    addUserGroupAccess: this.addUserGroupAccess,
                    dataShareable: this.props.dataShareable,
                    currentAccessIds: accessIds
                })
            );
        }
    }]);

    return Sharing;
}(React.Component);

Sharing.propTypes = {
    /**
     * The object to share
     */
    sharedObject: PropTypes.object.isRequired,

    /*
     * If true, the object's data should have their own settings.
     */
    dataShareable: PropTypes.bool.isRequired,

    /**
     * Function that takes an object containing updated sharing preferences and
     * an optional callback fired when the change was successfully posted.
     */
    onChange: PropTypes.func.isRequired,

    /**
     * Takes a string and a callback, and returns matching users and userGroups.
     */
    onSearch: PropTypes.func.isRequired
};

Sharing.contextTypes = {
    d2: PropTypes.object.isRequired
};

export default Sharing;