import React from 'react'

export default function ProgressBar({onClick, stage, maxStage}) {
    const steps = [];

        for(let i = 0; i < maxStage; i++) {
            steps.push(
                <span key={i} className={(stage > i) ? 'stage active' : 'stage'}></span>
            );
        }

  


  return (
    <progress-bar onClick={onClick}> {steps.map((item, key) => {
        return item;
    })} </progress-bar>
  );
}

