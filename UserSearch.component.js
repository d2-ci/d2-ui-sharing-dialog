import _extends from 'babel-runtime/helpers/extends';
import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Subject } from 'rxjs/Subject';
import { timer } from 'rxjs/observable/timer';
import { debounce } from 'rxjs/operators';

import { accessObjectToString } from './utils';
import PermissionPicker from './PermissionPicker.component';
import AutoComplete from './AutoComplete.component';

var styles = {
    container: {
        fontWeight: '400',
        padding: 16,
        backgroundColor: '#F5F5F5',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
    },

    innerContainer: {
        display: 'flex',
        flexDirection: 'row',
        flex: 1
    },

    title: {
        color: '#818181',
        paddingBottom: 8
    }
};

var searchDelay = 300;

var UserSearch = function (_Component) {
    _inherits(UserSearch, _Component);

    function UserSearch(props, context) {
        _classCallCheck(this, UserSearch);

        var _this = _possibleConstructorReturn(this, (UserSearch.__proto__ || _Object$getPrototypeOf(UserSearch)).call(this, props));

        _this.state = {
            defaultAccess: {
                meta: { canView: true, canEdit: true },
                data: { canView: false, canEdit: false }
            },
            searchResult: [],
            searchText: ''
        };

        _this.onItemSelected = function (selected) {
            // Material UI triggers an 'onUpdateInput' when a search result is clicked. Therefore, we
            // immediately pushes a new item to the search stream to prevent the stream from searching
            // for the item again.
            _this.inputStream.next('');

            var selection = _this.state.searchResult.find(function (r) {
                return r.id === selected.id;
            });

            var type = selection.type;
            delete selection.type;

            if (type === 'userAccess') {
                _this.props.addUserAccess(_extends({}, selection, {
                    access: accessObjectToString(_this.state.defaultAccess)
                }));
            } else {
                _this.props.addUserGroupAccess(_extends({}, selection, {
                    access: accessObjectToString(_this.state.defaultAccess)
                }));
            }
            _this.clearSearchText();
        };

        _this.inputStream = new Subject();

        _this.hasNoCurrentAccess = function (userOrGroup) {
            return _this.props.currentAccessIds.indexOf(userOrGroup.id) === -1;
        };

        _this.fetchSearchResult = function (searchText) {
            if (searchText === '') {
                _this.handleSearchResult([]);
            } else {
                _this.props.onSearch(searchText).then(function (_ref) {
                    var users = _ref.users,
                        userGroups = _ref.userGroups;

                    var addType = function addType(type) {
                        return function (result) {
                            return _extends({}, result, { type: type });
                        };
                    };
                    var searchResult = users.map(addType('userAccess')).filter(_this.hasNoCurrentAccess).concat(userGroups.map(addType('userGroupAccess')).filter(_this.hasNoCurrentAccess));

                    _this.handleSearchResult(searchResult);
                });
            }
        };

        _this.handleSearchResult = function (searchResult) {
            _this.setState({ searchResult: searchResult });
        };

        _this.onInputChanged = function (searchText) {
            _this.inputStream.next(searchText);
            _this.setState({ searchText: searchText });
        };

        _this.accessOptionsChanged = function (accessOptions) {
            _this.setState({
                defaultAccess: accessOptions
            });
        };

        _this.clearSearchText = function () {
            _this.setState({
                searchText: ''
            });
        };

        context.d2.i18n.addStrings(['add_users_and_user_groups', 'enter_names']);
        return _this;
    }

    _createClass(UserSearch, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            var _this2 = this;

            this.inputStream.pipe(debounce(function () {
                return timer(searchDelay);
            })).subscribe(function (searchText) {
                _this2.fetchSearchResult(searchText);
            });
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                { style: styles.container },
                React.createElement(
                    'div',
                    { style: styles.title },
                    this.context.d2.i18n.getTranslation('add_users_and_user_groups')
                ),
                React.createElement(
                    'div',
                    { style: styles.innerContainer },
                    React.createElement(AutoComplete, {
                        suggestions: this.state.searchResult,
                        placeholderText: this.context.d2.i18n.getTranslation('enter_names'),
                        onItemSelected: this.onItemSelected,
                        onInputChanged: this.onInputChanged,
                        searchText: this.state.searchText,
                        classes: {}
                    }),
                    React.createElement(PermissionPicker, {
                        access: this.state.defaultAccess,
                        accessOptions: {
                            meta: {
                                canView: true,
                                canEdit: true,
                                noAccess: false
                            },
                            data: this.props.dataShareable && {
                                canView: true,
                                canEdit: true,
                                noAccess: true
                            }
                        },
                        onChange: this.accessOptionsChanged
                    })
                )
            );
        }
    }]);

    return UserSearch;
}(Component);

UserSearch.propTypes = {
    onSearch: PropTypes.func.isRequired,
    addUserAccess: PropTypes.func.isRequired,
    dataShareable: PropTypes.bool.isRequired,
    addUserGroupAccess: PropTypes.func.isRequired,
    currentAccessIds: PropTypes.array.isRequired
};

UserSearch.contextTypes = {
    d2: PropTypes.object.isRequired
};

export default UserSearch;