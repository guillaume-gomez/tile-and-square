import React from 'react';

interface SliderInterface {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  float?: boolean;
}

function Slider({ value, onChange, min = 1, max = 100, step = 1, float = false } : SliderInterface): React.ReactElement {
  return (
   <input
     type="range"
     onChange={(event) => {
       if(float) {
         onChange(parseFloat(event.target.value))
       } else {
         onChange(parseInt(event.target.value))
       }
     }}
     min={min}
     max={max}
     value={value}
     step={step}
     className="range range-primary">
     </input> 
  );
}

export default Slider;
