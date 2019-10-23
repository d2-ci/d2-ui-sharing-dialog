import _extends from 'babel-runtime/helpers/extends';
import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import PropTypes from 'prop-types';
import Sharing from './Sharing.component';
import { LoadingMask } from '@dhis2/d2-ui-core';

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
    _inherits(SharingDialog, _React$Component);

    function SharingDialog(props) {
        _classCallCheck(this, SharingDialog);

        var _this = _possibleConstructorReturn(this, (SharingDialog.__proto__ || _Object$getPrototypeOf(SharingDialog)).call(this, props));

        _initialiseProps.call(_this);

        if (props.d2) {
            props.d2.i18n.addStrings(['share', 'close', 'no_manage_access']);
        } else {
            console.error('no d2');
        }
        return _this;
    }

    _createClass(SharingDialog, [{
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
            var sharingDialogActions = [React.createElement(
                Button,
                { key: 'closeonly', variant: 'contained', onClick: this.closeDialog },
                this.translate('close')
            )];

            if (this.props.doNotPost) {
                sharingDialogActions.push(React.createElement(
                    Button,
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

            return React.createElement(
                'div',
                null,
                React.createElement(Snackbar, {
                    open: errorOccurred,
                    message: this.state.errorMessage,
                    autoHideDuration: 3000
                }),
                React.createElement(
                    Dialog,
                    _extends({
                        PaperProps: { style: { width: '75%', maxWidth: '768px' } },
                        onClose: this.closeDialog
                    }, this.muiDialogProps()),
                    React.createElement(
                        DialogTitle,
                        null,
                        this.props.d2.i18n.getTranslation('share')
                    ),
                    React.createElement(
                        DialogContent,
                        null,
                        isLoading && React.createElement(LoadingMask, { style: styles.loadingMask, size: 1 }),
                        this.state.sharedObject && React.createElement(Sharing, {
                            sharedObject: this.state.sharedObject,
                            dataShareable: dataShareable,
                            onChange: this.onSharingChanged,
                            onSearch: this.onSearchRequest
                        })
                    ),
                    React.createElement(
                        DialogActions,
                        null,
                        sharingDialogActions
                    )
                )
            );
        }
    }]);

    return SharingDialog;
}(React.Component);

var _initialiseProps = function _initialiseProps() {
    var _this2 = this;

    this.state = _extends({}, defaultState, {
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
            object: _extends({}, _this2.state.sharedObject.object, updatedAttributes)
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
        return _extends({}, object, { id: _this2.props.id });
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
    d2: PropTypes.object
};

SharingDialog.propTypes = {
    /**
     * Decides whether the dialog should be open or closed.
     */
    open: PropTypes.bool.isRequired,

    /**
     * Type of the sharable object. Can be supplied after initial render.
     */
    type: PropTypes.string,

    /**
     * Id of the sharable object. Can be supplied after initial render.
     */
    id: PropTypes.string,

    /**
     * Do not post new sharing settings. Rather, let the user save the new
     * settings returned from onRequestClose or onConfirm. Combine with
     * 'sharedObject' prop to skip all network requests.
     */
    doNotPost: PropTypes.bool,

    /**
     * Supply your own shared object. Will try to POST sharing settings
     * to the 'id' and 'type' combination. Use 'doNotPost' prop if you
     * want full control over network requests.
     */
    sharedObject: PropTypes.shape({
        object: PropTypes.shape({
            user: PropTypes.shape({ name: PropTypes.string }).isRequired,
            displayName: PropTypes.string.isRequired,
            userAccesses: PropTypes.array.isRequired,
            userGroupAccesses: PropTypes.array.isRequired,
            publicAccess: PropTypes.string.isRequired,
            externalAccess: PropTypes.bool
        }),
        meta: PropTypes.shape({
            allowPublicAccess: PropTypes.bool.isRequired,
            allowExternalAccess: PropTypes.bool.isRequired
        })
    }),

    /**
     * Function to be called when the dialog is closed. The function is called
     * with the updated sharing preferences as the first and only argument.
     */
    onRequestClose: PropTypes.func.isRequired,

    /**
     * Function to be called when user applies the settings. Similar to
     * onRequestClose, but is only shown when doNotPost is true.
     */
    onConfirm: PropTypes.func,

    /**
     * d2 instance to use.
     */
    d2: PropTypes.object.isRequired
};

SharingDialog.defaultProps = {
    type: '',
    id: '',
    doNotPost: false,
    sharedObject: null
};

export default SharingDialog;