import React from 'react';
import PropTypes from 'prop-types';

export default function ProgressBar({ onClick, step, maxStep }) {
    const steps = [];

    for (let i = 0; i < maxStep; i++) {
        steps.push(
            <span key={i} className={(step > i) ? 'stage active' : 'stage'} role="progressbar" aria-valuemin="0" aria-valuemax={maxStep} aria-valuenow={step}></span>
        );
    }

    return (
        <div className="progress-bar" onClick={onClick} role="presentation" tabIndex={0}>
            {steps.map((item) => {
                return item;
            })}
        </div>
    );
}

ProgressBar.propTypes = {
    onClick: PropTypes.func,
    step: PropTypes.number.isRequired,
    maxStep: PropTypes.number,
};
