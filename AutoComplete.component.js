import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import _extends from 'babel-runtime/helpers/extends';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Downshift from 'downshift';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import Popper from '@material-ui/core/Popper';

var Input = function Input(_ref) {
    var InputProps = _ref.InputProps;

    return React.createElement(TextField, {
        id: 'user-search-input',
        fullWidth: true,
        InputProps: _extends({}, InputProps)
    });
};
Input.propTypes = {
    InputProps: PropTypes.object.isRequired
};

var Suggestion = function Suggestion(_ref2) {
    var suggestion = _ref2.suggestion,
        itemProps = _ref2.itemProps,
        isHighlighted = _ref2.isHighlighted,
        selectedItem = _ref2.selectedItem;

    var isSelected = selectedItem && selectedItem.id === suggestion.id;

    return React.createElement(
        MenuItem,
        _extends({}, itemProps, {
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
    isHighlighted: PropTypes.bool.isRequired,
    itemProps: PropTypes.object,
    selectedItem: PropTypes.object,
    suggestion: PropTypes.shape({ displayName: PropTypes.string }).isRequired
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
    _inherits(AutoComplete, _Component);

    function AutoComplete() {
        _classCallCheck(this, AutoComplete);

        return _possibleConstructorReturn(this, (AutoComplete.__proto__ || _Object$getPrototypeOf(AutoComplete)).apply(this, arguments));
    }

    _createClass(AutoComplete, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                classes = _props.classes,
                placeholderText = _props.placeholderText,
                suggestions = _props.suggestions,
                searchText = _props.searchText;


            return React.createElement(
                'div',
                { className: classes.root },
                React.createElement(
                    Downshift,
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

                        return React.createElement(
                            'div',
                            { className: classes.container },
                            React.createElement(Input, {
                                fullWidth: true,
                                classes: classes,
                                InputProps: getInputProps({
                                    placeholder: placeholderText,
                                    inputRef: function inputRef(node) {
                                        popperNode = node;
                                    }
                                })
                            }),
                            React.createElement(
                                'div',
                                getMenuProps(),
                                isOpen && React.createElement(
                                    Popper,
                                    { className: classes.popper, open: true, anchorEl: popperNode },
                                    React.createElement(
                                        Paper,
                                        { square: true, style: { width: popperNode ? popperNode.clientWidth : null } },
                                        suggestions.map(function (suggestion, index) {
                                            return React.createElement(Suggestion, {
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
}(Component);

AutoComplete.propTypes = {
    classes: PropTypes.object.isRequired,
    placeholderText: PropTypes.string,
    onInputChanged: PropTypes.func.isRequired,
    onItemSelected: PropTypes.func.isRequired,
    suggestions: PropTypes.array.isRequired
};

AutoComplete.defaultProps = {
    placeholderText: ''
};

export default withStyles(styles)(AutoComplete);