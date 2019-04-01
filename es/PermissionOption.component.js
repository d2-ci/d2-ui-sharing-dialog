import React from 'react';
import PropTypes from 'prop-types';
import { SvgIcon } from '@dhis2/d2-ui-core';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

var PermissionOption = function PermissionOption(props) {
    if (props.disabled) {
        return null;
    }

    return React.createElement(
        MenuItem,
        {
            disabled: props.disabled,
            onClick: props.onClick,
            selected: props.isSelected
        },
        props.isSelected && React.createElement(
            ListItemIcon,
            null,
            React.createElement(SvgIcon, { icon: 'Done' })
        ),
        React.createElement(ListItemText, { inset: true, primary: props.primaryText })
    );
};

PermissionOption.propTypes = {
    disabled: PropTypes.bool.isRequired,
    isSelected: PropTypes.bool,
    primaryText: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
};

PermissionOption.defaultProps = {
    isSelected: false
};

export default PermissionOption;