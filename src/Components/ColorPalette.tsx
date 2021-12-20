import React, { useState } from 'react';
import SliderWithLabel from "./SliderWithLabel";

const styles = {
  //border: '0.0625rem solid #9c9c9c',
  //borderRadius: 'rounded-box',
};

const COLORS=["#000000", "#FF00FF", "#FFFF00", "#00FFFF", "#00FF00", "#FF0000"];

interface ColorPaletteInterface {
  onChange: (rgba: string) => void;
}

function ColorPalette({ onChange } : ColorPaletteInterface) {
  const [opacity, setOpacity] = useState<number>(255);
  const [color, setColor] = useState<string>(COLORS[0]);

  function changeColor(color: string) {
    onChange(computeColor(color, opacity));
    setColor(color);
  }

  function changeOpacity(opacity: number) {
    onChange(computeColor(color, opacity));
    setOpacity(opacity);
  }

  function renderColors() {
    return COLORS.map(color => renderColor(color));
  }

  function renderColor(color: string) {
    return (
      <button className="btn" value={color} style={{ backgroundColor: computeColor(color, opacity) }} onClick={() => changeColor(color)}></button>
    );
  }

  function computeColor(color: string, opacity: number) : string {
    return `${color}${opacity.toString(16)}`;
  }

  return (
      <div className="flex flex-col gap-1">
        <div className="grid grid-cols-3 gap-1">
        {renderColors()}
        </div>
        <div>
          <SliderWithLabel label="Opacity" value={opacity} max={255} onChange={(value) => changeOpacity(parseInt(value))} />
        </div>
        <div style={ {width: "100%", minHeight: "30px", backgroundColor: computeColor(color, opacity) }} >

        </div>
      </div>
  );
}

export default ColorPalette;
