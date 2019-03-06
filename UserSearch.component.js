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

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Subject = require('rxjs/Subject');

var _timer = require('rxjs/observable/timer');

var _operators = require('rxjs/operators');

var _utils = require('./utils');

var _PermissionPicker = require('./PermissionPicker.component');

var _PermissionPicker2 = _interopRequireDefault(_PermissionPicker);

var _AutoComplete = require('./AutoComplete.component');

var _AutoComplete2 = _interopRequireDefault(_AutoComplete);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
    (0, _inherits3.default)(UserSearch, _Component);

    function UserSearch(props, context) {
        (0, _classCallCheck3.default)(this, UserSearch);

        var _this = (0, _possibleConstructorReturn3.default)(this, (UserSearch.__proto__ || (0, _getPrototypeOf2.default)(UserSearch)).call(this, props));

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
                _this.props.addUserAccess((0, _extends3.default)({}, selection, {
                    access: (0, _utils.accessObjectToString)(_this.state.defaultAccess)
                }));
            } else {
                _this.props.addUserGroupAccess((0, _extends3.default)({}, selection, {
                    access: (0, _utils.accessObjectToString)(_this.state.defaultAccess)
                }));
            }
            _this.clearSearchText();
        };

        _this.inputStream = new _Subject.Subject();

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
                            return (0, _extends3.default)({}, result, { type: type });
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

    (0, _createClass3.default)(UserSearch, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            var _this2 = this;

            this.inputStream.pipe((0, _operators.debounce)(function () {
                return (0, _timer.timer)(searchDelay);
            })).subscribe(function (searchText) {
                _this2.fetchSearchResult(searchText);
            });
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { style: styles.container },
                _react2.default.createElement(
                    'div',
                    { style: styles.title },
                    this.context.d2.i18n.getTranslation('add_users_and_user_groups')
                ),
                _react2.default.createElement(
                    'div',
                    { style: styles.innerContainer },
                    _react2.default.createElement(_AutoComplete2.default, {
                        suggestions: this.state.searchResult,
                        placeholderText: this.context.d2.i18n.getTranslation('enter_names'),
                        onItemSelected: this.onItemSelected,
                        onInputChanged: this.onInputChanged,
                        searchText: this.state.searchText,
                        classes: {}
                    }),
                    _react2.default.createElement(_PermissionPicker2.default, {
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
}(_react.Component);

UserSearch.propTypes = {
    onSearch: _propTypes2.default.func.isRequired,
    addUserAccess: _propTypes2.default.func.isRequired,
    dataShareable: _propTypes2.default.bool.isRequired,
    addUserGroupAccess: _propTypes2.default.func.isRequired,
    currentAccessIds: _propTypes2.default.array.isRequired
};

UserSearch.contextTypes = {
    d2: _propTypes2.default.object.isRequired
};

exports.default = UserSearch;