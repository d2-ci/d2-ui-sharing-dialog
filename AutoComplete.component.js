'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

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

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _downshift = require('downshift');

var _downshift2 = _interopRequireDefault(_downshift);

var _styles = require('@material-ui/core/styles');

var _TextField = require('@material-ui/core/TextField');

var _TextField2 = _interopRequireDefault(_TextField);

var _Paper = require('@material-ui/core/Paper');

var _Paper2 = _interopRequireDefault(_Paper);

var _MenuItem = require('@material-ui/core/MenuItem');

var _MenuItem2 = _interopRequireDefault(_MenuItem);

var _Popper = require('@material-ui/core/Popper');

var _Popper2 = _interopRequireDefault(_Popper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Input = function Input(_ref) {
    var InputProps = _ref.InputProps;

    return _react2.default.createElement(_TextField2.default, {
        id: 'user-search-input',
        fullWidth: true,
        InputProps: (0, _extends3.default)({}, InputProps)
    });
};
Input.propTypes = {
    InputProps: _propTypes2.default.object.isRequired
};

var Suggestion = function Suggestion(_ref2) {
    var suggestion = _ref2.suggestion,
        itemProps = _ref2.itemProps,
        isHighlighted = _ref2.isHighlighted,
        selectedItem = _ref2.selectedItem;

    var isSelected = selectedItem && selectedItem.id === suggestion.id;

    return _react2.default.createElement(
        _MenuItem2.default,
        (0, _extends3.default)({}, itemProps, {
            key: suggestion.label,
            selected: isHighlighted,
            component: 'div',
            style: {
                fontWeight: isSelected ? 500 : 400
            }
        }),
        suggestion.displayName
    );
};

Suggestion.propTypes = {
    isHighlighted: _propTypes2.default.bool.isRequired,
    itemProps: _propTypes2.default.object,
    selectedItem: _propTypes2.default.object,
    suggestion: _propTypes2.default.shape({ displayName: _propTypes2.default.string }).isRequired
};

var styles = function styles(theme) {
    return {
        root: {
            flexGrow: 1,
            height: 60
        },
        popper: {
            zIndex: 2000,
            maxHeight: '420px',
            overflowY: 'hidden',
            boxShadow: '0px 0px 1px 1px rgba(0,0,0,0.2)'
        },
        container: {
            flexGrow: 1,
            position: 'relative'
        },
        inputRoot: {
            flexWrap: 'wrap'
        }
    };
};

var popperNode = void 0;

var AutoComplete = function (_Component) {
    (0, _inherits3.default)(AutoComplete, _Component);

    function AutoComplete() {
        (0, _classCallCheck3.default)(this, AutoComplete);
        return (0, _possibleConstructorReturn3.default)(this, (AutoComplete.__proto__ || (0, _getPrototypeOf2.default)(AutoComplete)).apply(this, arguments));
    }

    (0, _createClass3.default)(AutoComplete, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                classes = _props.classes,
                placeholderText = _props.placeholderText,
                suggestions = _props.suggestions,
                searchText = _props.searchText;


            return _react2.default.createElement(
                'div',
                { className: classes.root },
                _react2.default.createElement(
                    _downshift2.default,
                    {
                        id: 'user-autocomplete',
                        onInputValueChange: this.props.onInputChanged,
                        onChange: this.props.onItemSelected,
                        itemToString: function itemToString(item) {
                            return item ? item.name : '';
                        },
                        inputValue: searchText
                    },
                    function (_ref3) {
                        var getInputProps = _ref3.getInputProps,
                            getItemProps = _ref3.getItemProps,
                            getMenuProps = _ref3.getMenuProps,
                            highlightedIndex = _ref3.highlightedIndex,
                            isOpen = _ref3.isOpen,
                            selectedItem = _ref3.selectedItem;

                        return _react2.default.createElement(
                            'div',
                            { className: classes.container },
                            _react2.default.createElement(Input, {
                                fullWidth: true,
                                classes: classes,
                                InputProps: getInputProps({
                                    placeholder: placeholderText,
                                    inputRef: function inputRef(node) {
                                        popperNode = node;
                                    }
                                })
                            }),
                            _react2.default.createElement(
                                'div',
                                getMenuProps(),
                                isOpen && _react2.default.createElement(
                                    _Popper2.default,
                                    { className: classes.popper, open: true, anchorEl: popperNode },
                                    _react2.default.createElement(
                                        _Paper2.default,
                                        { square: true, style: { width: popperNode ? popperNode.clientWidth : null } },
                                        suggestions.map(function (suggestion, index) {
                                            return _react2.default.createElement(Suggestion, {
                                                key: suggestion.id,
                                                suggestion: suggestion,
                                                itemProps: getItemProps({
                                                    item: {
                                                        name: suggestion.displayName,
                                                        id: suggestion.id
                                                    }
                                                }),
                                                isHighlighted: highlightedIndex === index,
                                                selectedItem: selectedItem
                                            });
                                        })
                                    )
                                )
                            )
                        );
                    }
                )
            );
        }
    }]);
    return AutoComplete;
}(_react.Component);

AutoComplete.propTypes = {
    classes: _propTypes2.default.object.isRequired,
    placeholderText: _propTypes2.default.string,
    onInputChanged: _propTypes2.default.func.isRequired,
    onItemSelected: _propTypes2.default.func.isRequired,
    suggestions: _propTypes2.default.array.isRequired
};

AutoComplete.defaultProps = {
    placeholderText: ''
};

exports.default = (0, _styles.withStyles)(styles)(AutoComplete);