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

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Dialog = require('@material-ui/core/Dialog');

var _Dialog2 = _interopRequireDefault(_Dialog);

var _DialogTitle = require('@material-ui/core/DialogTitle');

var _DialogTitle2 = _interopRequireDefault(_DialogTitle);

var _DialogContent = require('@material-ui/core/DialogContent');

var _DialogContent2 = _interopRequireDefault(_DialogContent);

var _DialogActions = require('@material-ui/core/DialogActions');

var _DialogActions2 = _interopRequireDefault(_DialogActions);

var _Button = require('@material-ui/core/Button');

var _Button2 = _interopRequireDefault(_Button);

var _Snackbar = require('@material-ui/core/Snackbar');

var _Snackbar2 = _interopRequireDefault(_Snackbar);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Sharing = require('./Sharing.component');

var _Sharing2 = _interopRequireDefault(_Sharing);

var _d2UiCore = require('@dhis2/d2-ui-core');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = {
    loadingMask: {
        position: 'relative'
    }
};

var defaultState = {
    sharedObject: null,
    errorMessage: ''
};

/**
 * A pop-up dialog for changing sharing preferences for a sharable object.
 */

var SharingDialog = function (_React$Component) {
    (0, _inherits3.default)(SharingDialog, _React$Component);

    function SharingDialog(props) {
        (0, _classCallCheck3.default)(this, SharingDialog);

        var _this = (0, _possibleConstructorReturn3.default)(this, (SharingDialog.__proto__ || (0, _getPrototypeOf2.default)(SharingDialog)).call(this, props));

        _initialiseProps.call(_this);

        if (props.d2) {
            props.d2.i18n.addStrings(['share', 'close', 'no_manage_access']);
        } else {
            console.error('no d2');
        }
        return _this;
    }

    (0, _createClass3.default)(SharingDialog, [{
        key: 'getChildContext',
        value: function getChildContext() {
            return { d2: this.props.d2 };
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.loadDataSharingSettings();

            /* Load object if:
             *   - Dialog is open
             *   - Type and ID is supplied
             *   - User did not supply their own shared object
             */
            if (this.props.open && this.isReadyToLoadObject(this.props)) {
                this.loadObjectFromApi(this.props);
            }
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            var hasChanged = this.createPropsChecker(nextProps);

            if ((hasChanged('id') || hasChanged('type') || hasChanged('sharedObject')) && this.isReadyToLoadObject(nextProps)) {
                this.resetState();

                if (nextProps.open) {
                    this.loadObjectFromApi(nextProps);
                }
            }

            if (!this.props.open && nextProps.open && this.isReadyToLoadObject(nextProps)) {
                this.loadObjectFromApi(nextProps);
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var dataShareable = this.state.dataShareableTypes.indexOf(this.props.type) !== -1;
            var errorOccurred = this.state.errorMessage !== '';
            var isLoading = !this.state.sharedObject && this.props.open && !errorOccurred;
            var sharingDialogActions = [_react2.default.createElement(
                _Button2.default,
                { key: 'closeonly', variant: 'contained', onClick: this.closeDialog },
                this.translate('close')
            )];

            if (this.props.doNotPost) {
                sharingDialogActions.push(_react2.default.createElement(
                    _Button2.default,
                    {
                        key: 'confirmandclose',
                        variant: 'contained',
                        color: 'primary',
                        style: { marginLeft: '8px' },
                        onClick: this.confirmAndCloseDialog
                    },
                    this.translate('apply')
                ));
            }

            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(_Snackbar2.default, {
                    open: errorOccurred,
                    message: this.state.errorMessage,
                    autoHideDuration: 3000
                }),
                _react2.default.createElement(
                    _Dialog2.default,
                    (0, _extends3.default)({
                        PaperProps: { style: { width: '75%', maxWidth: '768px' } },
                        onClose: this.closeDialog
                    }, this.muiDialogProps()),
                    _react2.default.createElement(
                        _DialogTitle2.default,
                        null,
                        this.props.d2.i18n.getTranslation('share')
                    ),
                    _react2.default.createElement(
                        _DialogContent2.default,
                        null,
                        isLoading && _react2.default.createElement(_d2UiCore.LoadingMask, { style: styles.loadingMask, size: 1 }),
                        this.state.sharedObject && _react2.default.createElement(_Sharing2.default, {
                            sharedObject: this.state.sharedObject,
                            dataShareable: dataShareable,
                            onChange: this.onSharingChanged,
                            onSearch: this.onSearchRequest
                        })
                    ),
                    _react2.default.createElement(
                        _DialogActions2.default,
                        null,
                        sharingDialogActions
                    )
                )
            );
        }
    }]);
    return SharingDialog;
}(_react2.default.Component);

var _initialiseProps = function _initialiseProps() {
    var _this2 = this;

    this.state = (0, _extends3.default)({}, defaultState, {
        dataShareableTypes: []
    });

    this.onSearchRequest = function (key) {
        return _this2.props.d2.Api.getApi().get('sharing/search', { key: key }).then(function (searchResult) {
            return searchResult;
        });
    };

    this.onSharingChanged = function (updatedAttributes, onSuccess) {
        var updatedObject = {
            meta: _this2.state.sharedObject.meta,
            object: (0, _extends3.default)({}, _this2.state.sharedObject.object, updatedAttributes)
        };

        if (_this2.props.doNotPost) {
            _this2.updateSharedObject(updatedObject, onSuccess);
        } else {
            _this2.postChanges(updatedObject, onSuccess);
        }
    };

    this.isReadyToLoadObject = function (props) {
        return props.type && (props.id || props.sharedObject);
    };

    this.createPropsChecker = function (nextProps) {
        return function (field) {
            return nextProps[field] !== _this2.props[field];
        };
    };

    this.postChanges = function (updatedObject, onSuccess) {
        var url = 'sharing?type=' + _this2.props.type + '&id=' + _this2.props.id;
        return _this2.props.d2.Api.getApi().post(url, updatedObject).then(function (_ref) {
            var httpStatus = _ref.httpStatus,
                message = _ref.message;

            if (httpStatus === 'OK') {
                _this2.updateSharedObject(updatedObject, onSuccess);
            }

            return message;
        }).catch(function (_ref2) {
            var message = _ref2.message;

            _this2.setState({
                errorMessage: message
            });
        });
    };

    this.updateSharedObject = function (updatedObject, onSuccess) {
        _this2.setState({
            sharedObject: updatedObject
        }, function () {
            if (onSuccess) onSuccess();
        });
    };

    this.resetState = function () {
        _this2.setState(defaultState);
    };

    this.loadDataSharingSettings = function () {
        _this2.props.d2.Api.getApi().get('schemas', { fields: ['name', 'dataShareable'] }).then(function (schemas) {
            var dataShareableTypes = schemas.schemas.filter(function (item) {
                return item.dataShareable;
            }).map(function (item) {
                return item.name;
            });

            _this2.setState({
                dataShareableTypes: dataShareableTypes
            });
        });
    };

    this.loadObjectFromApi = function (props) {
        var setSharedObject = function setSharedObject(sharedObject) {
            _this2.setState({
                sharedObject: sharedObject
            });
        };

        if (props.sharedObject) {
            setSharedObject(props.sharedObject);
        } else {
            _this2.props.d2.Api.getApi().get('sharing', { type: props.type, id: props.id }).then(function (sharedObject) {
                return setSharedObject(sharedObject);
            }).catch(function (error) {
                _this2.setState({
                    errorMessage: error.message
                });
            });
        }
    };

    this.addId = function (object) {
        return (0, _extends3.default)({}, object, { id: _this2.props.id });
    };

    this.closeDialog = function () {
        _this2.props.onRequestClose(_this2.addId(_this2.state.sharedObject.object, _this2.props.id));
    };

    this.confirmAndCloseDialog = function () {
        _this2.props.onConfirm(_this2.addId(_this2.state.sharedObject.object, _this2.props.id));
    };

    this.translate = function (s) {
        return _this2.props.d2.i18n.getTranslation(s);
    };

    this.muiDialogProps = function () {
        var pick = function pick(_ref3) {
            var open = _ref3.open,
                onEnter = _ref3.onEnter,
                onExit = _ref3.onExit,
                onExited = _ref3.onExited;
            return {
                open: open,
                onEnter: onEnter,
                onExit: onExit,
                onExited: onExited
            };
        };

        return pick(_this2.props);
    };
};

SharingDialog.childContextTypes = {
    d2: _propTypes2.default.object
};

SharingDialog.propTypes = {
    /**
     * Decides whether the dialog should be open or closed.
     */
    open: _propTypes2.default.bool.isRequired,

    /**
     * Type of the sharable object. Can be supplied after initial render.
     */
    type: _propTypes2.default.string,

    /**
     * Id of the sharable object. Can be supplied after initial render.
     */
    id: _propTypes2.default.string,

    /**
     * Do not post new sharing settings. Rather, let the user save the new
     * settings returned from onRequestClose or onConfirm. Combine with
     * 'sharedObject' prop to skip all network requests.
     */
    doNotPost: _propTypes2.default.bool,

    /**
     * Supply your own shared object. Will try to POST sharing settings
     * to the 'id' and 'type' combination. Use 'doNotPost' prop if you
     * want full control over network requests.
     */
    sharedObject: _propTypes2.default.shape({
        object: _propTypes2.default.shape({
            user: _propTypes2.default.shape({ name: _propTypes2.default.string }).isRequired,
            displayName: _propTypes2.default.string.isRequired,
            userAccesses: _propTypes2.default.array.isRequired,
            userGroupAccesses: _propTypes2.default.array.isRequired,
            publicAccess: _propTypes2.default.string.isRequired,
            externalAccess: _propTypes2.default.bool
        }),
        meta: _propTypes2.default.shape({
            allowPublicAccess: _propTypes2.default.bool.isRequired,
            allowExternalAccess: _propTypes2.default.bool.isRequired
        })
    }),

    /**
     * Function to be called when the dialog is closed. The function is called
     * with the updated sharing preferences as the first and only argument.
     */
    onRequestClose: _propTypes2.default.func.isRequired,

    /**
     * Function to be called when user applies the settings. Similar to
     * onRequestClose, but is only shown when doNotPost is true.
     */
    onConfirm: _propTypes2.default.func,

    /**
     * d2 instance to use.
     */
    d2: _propTypes2.default.object.isRequired
};

SharingDialog.defaultProps = {
    type: '',
    id: '',
    doNotPost: false,
    sharedObject: null
};

exports.default = SharingDialog;