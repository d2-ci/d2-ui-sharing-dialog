'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CreatedBy = function CreatedBy(_ref, context) {
    var author = _ref.author;

    context.d2.i18n.addStrings(['created_by', 'no_author']);

    var createdByText = author ? context.d2.i18n.getTranslation('created_by') + ': ' + author.name : context.d2.i18n.getTranslation('no_author');

    return _react2.default.createElement(
        'div',
        null,
        createdByText
    );
};

CreatedBy.propTypes = {
    author: _propTypes2.default.object.isRequired
};

CreatedBy.contextTypes = {
    d2: _propTypes2.default.object.isRequired
};

exports.default = CreatedBy;