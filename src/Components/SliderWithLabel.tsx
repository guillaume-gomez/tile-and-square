import React, { useState } from 'react';
import Slider from "./Slider";

interface SliderWithLabelInterface {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  label: string;
  float?: boolean
}

function SliderWithLabel({ value, onChange, min = 1, max = 100, step = 1, label, float = false } : SliderWithLabelInterface): React.ReactElement {
  const [hasEditable, setHasEditable] = useState<boolean>(false);
  
  function parseOnChange(event : any) {
    const newValue = float ? parseFloat(event.target.value) : parseInt(event.target.value);
    onChange(newValue);
  }

  return (
   <div>
     <div className="flex justify-between" onClick={() => setHasEditable(!hasEditable)}>
       <label className="text-base font-semibold">{label}</label>
       {
          hasEditable ?
            <input
              className="input input-primary input-xs"
              type="number"
              min={min}
              max={max}
              step={step}
              value={value}
              onBlur={() => setHasEditable(false)}
              onChange={parseOnChange}
            />
          :
          <div
            className="badge badge-lg"
            onClick={() => setHasEditable(true)}
          >
            {value}
          </div>
        }
     </div>
     <Slider value={value} onChange={onChange} min={min} max={max} step={step} float={float} />
    </div>
  );
}

export default SliderWithLabel;
