import React, { useState } from 'react';
import InputColor from "./InputColor";
import SliderWithLabel from "./SliderWithLabel";

interface InputColorRGBAInterface {
  onChange: (rgba: string) => void;
  color: string;
}

function InputColorRGBA({ onChange, color } : InputColorRGBAInterface) {
  const [opacity, setOpacity] = useState<number>(255);

  function computeColor(color: string, opacity: number) : string {
    let newColor = color;
    if(color.length > 7) {
      newColor = color.substring(0, 7);
    }
    return `${newColor}${opacity.toString(16)}`;
  }

  function changeOpacity(opacity: number) {
    onChange(computeColor(color, opacity));
    setOpacity(opacity);
  }
  return (
    <div className="flex flex-col">
      <InputColor onChange={(color) => onChange(color) } color={computeColor(color, opacity)} />
      <SliderWithLabel label="Opacity" value={opacity} max={255} onChange={(value) => changeOpacity(value)} />
    </div>
  );
}

export default InputColorRGBA;


