import React from 'react';

interface InputColorInterface {
  onChange: (rgba: string) => void;
  color: string;
}

function InputColor({ onChange, color } : InputColorInterface) {

  return (
    <div className="btn p-0" style={{backgroundColor: color }}>
      <input className="w-full h-full" type="color" style={{ opacity: 0 }} onChange={(event) => onChange(event.target.value)} />
    </div>
  );
}

export default InputColor;


