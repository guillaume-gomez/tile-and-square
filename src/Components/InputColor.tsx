import React from 'react';

interface InputColorInterface {
  onChange: (rgba: string) => void;
  color: string;
  label?: string;
}

function InputColor({ onChange, color, label } : InputColorInterface) {

  function fromRGBAToRBG() : string {
    return color.substring(0,7);
  }

  return (
    <button className="btn p-0" style={{backgroundColor: color }}>
      <div className="relative w-full h-full">
        {
          label ?
          <div className="relative top-1/4">{label}</div> : <></>
        }
        <input className="absolute top-0 left-0 w-full h-full" style={{ opacity: 0 }} type="color" value={fromRGBAToRBG()} onChange={(event) => onChange(event.target.value)} />
      </div>
    </button>
  );
}

export default InputColor;


