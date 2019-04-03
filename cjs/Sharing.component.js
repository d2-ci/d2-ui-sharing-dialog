'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Divider = require('@material-ui/core/Divider');

var _Divider2 = _interopRequireDefault(_Divider);

var _Typography = require('@material-ui/core/Typography');

var _Typography2 = _interopRequireDefault(_Typography);

var _d2UiCore = require('@dhis2/d2-ui-core');

var _UserSearch = require('./UserSearch.component');

var _UserSearch2 = _interopRequireDefault(_UserSearch);

var _CreatedBy = require('./CreatedBy.component');

var _CreatedBy2 = _interopRequireDefault(_CreatedBy);

var _Access = require('./Access.component');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
    (0, _inherits3.default)(Sharing, _React$Component);

    function Sharing(props, context) {
        (0, _classCallCheck3.default)(this, Sharing);

        var _this = (0, _possibleConstructorReturn3.default)(this, (Sharing.__proto__ || (0, _getPrototypeOf2.default)(Sharing)).call(this, props));

        _this.onAccessRuleChange = function (id) {
            return function (accessRule) {
                var changeWithId = function changeWithId(rule) {
                    return rule.id === id ? (0, _extends3.default)({}, rule, { access: accessRule }) : rule;
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
                userAccesses: [].concat((0, _toConsumableArray3.default)(currentAccesses), [userAccess])
            }, _this.scrollAccessListToBottom());
        };

        _this.addUserGroupAccess = function (userGroupAccess) {
            var currentAccesses = _this.props.sharedObject.object.userGroupAccesses || [];
            _this.props.onChange({
                userGroupAccesses: [].concat((0, _toConsumableArray3.default)(currentAccesses), [userGroupAccess])
            }, _this.scrollAccessListToBottom());
        };

        _this.scrollAccessListToBottom = function () {
            _this.accessListRef.scrollTop = _this.accessListRef.scrollHeight;
        };

        context.d2.i18n.addStrings(['who_has_access']);
        return _this;
    }

    (0, _createClass3.default)(Sharing, [{
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

            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(_d2UiCore.Heading, { text: displayName, level: 2 }),
                _react2.default.createElement(_CreatedBy2.default, { author: user }),
                _react2.default.createElement('div', { style: styles.titleBodySpace }),
                _react2.default.createElement(
                    _Typography2.default,
                    { variant: 'subheading' },
                    this.context.d2.i18n.getTranslation('who_has_access')
                ),
                _react2.default.createElement(_Divider2.default, null),
                _react2.default.createElement(
                    'div',
                    { style: styles.rules, ref: this.setAccessListRef },
                    _react2.default.createElement(_Access.PublicAccess, {
                        access: publicAccess,
                        disabled: !allowPublicAccess,
                        dataShareable: this.props.dataShareable,
                        onChange: this.onPublicAccessChange
                    }),
                    _react2.default.createElement(_Divider2.default, null),
                    _react2.default.createElement(_Access.ExternalAccess, {
                        access: externalAccess,
                        disabled: !allowExternalAccess,
                        onChange: this.onExternalAccessChange
                    }),
                    _react2.default.createElement(_Divider2.default, null),
                    userAccesses && userAccesses.map(function (access) {
                        return _react2.default.createElement(
                            'div',
                            { key: access.id },
                            _react2.default.createElement(_Access.GroupAccess, {
                                groupName: access.displayName,
                                groupType: 'user',
                                access: access.access,
                                dataShareable: _this2.props.dataShareable,
                                onRemove: _this2.onAccessRemove(access.id),
                                onChange: _this2.onAccessRuleChange(access.id)
                            }),
                            _react2.default.createElement(_Divider2.default, null)
                        );
                    }),
                    userGroupAccesses && userGroupAccesses.map(function (access) {
                        return _react2.default.createElement(
                            'div',
                            { key: access.id },
                            _react2.default.createElement(_Access.GroupAccess, {
                                access: access.access,
                                groupName: access.displayName,
                                groupType: 'userGroup',
                                dataShareable: _this2.props.dataShareable,
                                onRemove: _this2.onAccessRemove(access.id),
                                onChange: _this2.onAccessRuleChange(access.id)
                            }),
                            _react2.default.createElement(_Divider2.default, null)
                        );
                    })
                ),
                _react2.default.createElement(_UserSearch2.default, {
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
}(_react2.default.Component);

Sharing.propTypes = {
    /**
     * The object to share
     */
    sharedObject: _propTypes2.default.object.isRequired,

    /*
     * If true, the object's data should have their own settings.
     */
    dataShareable: _propTypes2.default.bool.isRequired,

    /**
     * Function that takes an object containing updated sharing preferences and
     * an optional callback fired when the change was successfully posted.
     */
    onChange: _propTypes2.default.func.isRequired,

    /**
     * Takes a string and a callback, and returns matching users and userGroups.
     */
    onSearch: _propTypes2.default.func.isRequired
};

Sharing.contextTypes = {
    d2: _propTypes2.default.object.isRequired
};

exports.default = Sharing;