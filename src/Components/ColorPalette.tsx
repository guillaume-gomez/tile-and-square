import React, { useState } from 'react';
import SliderWithLabel from "./SliderWithLabel";
import InputColor from "./InputColor";
import InputColorRGBA from "./InputColorRGBA";

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color + "FF";
}


const styles = {
  //border: '0.0625rem solid #9c9c9c',
  //borderRadius: 'rounded-box',
};

const COLORS=["#000000", "#FF00FF", "#FFFF00", "#00FFFF", "#00FF00", "#FF0000", "#0F0FD0", "#ADEDFF"];

interface ColorPaletteInterface {
  onChange: (rgba: string) => void;
}

function ColorPalette({ onChange } : ColorPaletteInterface) {
  const [color, setColor] = useState<string>(COLORS[0]);
  const [customColor, setCustomColor] = useState<string>(getRandomColor());

  function changeColor(color: string) {
    onChange(color);
    setColor(color);
  }

  function changeCustomColor(color: string) {
    onChange(color);
    setColor(color);
    setCustomColor(color);
  }

  function renderColors() {
    return COLORS.map(color => renderColor(color));
  }

  function renderColor(color: string) {
    return (
      <button key={color} className="btn" value={color} style={{ backgroundColor: color }} onClick={() => changeColor(color)}></button>
    );
  }

  return (
      <div className="flex flex-col gap-1">
        <div className="grid grid-cols-3 gap-1">
          {renderColors()}
          <InputColor onChange={(color) => changeCustomColor(color)} color={customColor}/>
        </div>
        Result
        <InputColorRGBA onChange={(color) => changeColor(color)} color={color} />
      </div>
  );
}

export default ColorPalette;
