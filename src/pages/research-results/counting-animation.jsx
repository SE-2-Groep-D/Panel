import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types';

export default function CountingAnimation({value, duration = 1000}) {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const [count, setCount] = useState(0);
    const {number, unit} = extractNumberAndUnit(value);

    const increment = number / (duration / 1000);
    useEffect(() => {
        if(prefersReducedMotion) {
            setCount(number);
            return;
        }

        let animationFrameId;
        const startTimestamp = performance.now();
    
        const updateCount = (timestamp) => {
          const elapsed = timestamp - startTimestamp;
          const newCount = Math.min(number, Math.floor(increment * elapsed / 1000));
    
          setCount(newCount);
          if (elapsed < duration) {
            animationFrameId = requestAnimationFrame(updateCount);
          }
        };
    
        animationFrameId = requestAnimationFrame(updateCount);
    
        return () => {
          cancelAnimationFrame(animationFrameId);
        };
      }, [number, duration, increment, prefersReducedMotion]);
   

  return (
    <>
        <span>{count}</span>
        {unit}
    </>
  )
}

const extractNumberAndUnit = (value) => {
    if(value === null || value === undefined) 
        return {number: 0, unit: ''};

   if(typeof value === 'number') {
         return {number: value, unit: ''}
   }

   const match = value.match(/^([\d.]+)([a-zA-Z%]+)/);


   if(!match) {
    return {number: 0, unit: ''}
   }

   const number = parseInt(match[1], 10);
   const unit = match[2];

   return {number, unit}
  };
  

  CountingAnimation.propTypes = {
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    duration: PropTypes.number
  };