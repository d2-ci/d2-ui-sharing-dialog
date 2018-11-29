import PropTypes from 'prop-types';
import React from 'react';

var CreatedBy = function CreatedBy(_ref, context) {
    var author = _ref.author;

    context.d2.i18n.addStrings(['created_by', 'no_author']);

    var createdByText = author ? context.d2.i18n.getTranslation('created_by') + ': ' + author.name : context.d2.i18n.getTranslation('no_author');

    return React.createElement(
        'div',
        null,
        createdByText
    );
};

CreatedBy.propTypes = {
    author: PropTypes.object.isRequired
};

CreatedBy.contextTypes = {
    d2: PropTypes.object.isRequired
};

export default CreatedBy;