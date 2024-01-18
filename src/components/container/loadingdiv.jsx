import React from 'react';
import PropTypes from 'prop-types';

const LoadingDiv = ({ children, loading, className }) => {
    const combinedClassName = `${className || ''} loading-div${loading ? ' loading' : ''}${!children ? ' empty' : ''}`;

    return (
        <div className={combinedClassName} role="status" aria-busy={loading}>
            {children}
        </div>
    );
};

LoadingDiv.propTypes = {
    children: PropTypes.node,
    loading: PropTypes.bool,
    className: PropTypes.string,
};

export default LoadingDiv;