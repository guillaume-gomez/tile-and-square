import React, { useState, useRef } from 'react';
import { ReactSketchCanvas, ReactSketchCanvasRef } from 'react-sketch-canvas';
import ColorPalette from "./ColorPalette";
import InputColorRGBA from "./InputColorRGBA";
import DrawerActionsPalette from "./DrawerActionsPalette";

const styles = {
  //border: '0.0625rem solid #9c9c9c',
  //borderRadius: 'rounded-box',
};


function Drawer() {
  const [pencilColor, setPencilColor] = useState<string>("#00000000");
  const [backgroundColor, setBackgroundColor] = useState<string>("#FFFFFFFF");
  const [pencilThickness, setPencilThickness] = useState<number>(4);
  const [eraserThickness, setEraserThickness] = useState<number>(8);
  const canvasRef = useRef<ReactSketchCanvasRef>(null);

  return (
    <div className="w-full flex gap-2 lg:flex-row sm:flex-col card-body bg-base-200 rounded-box">
      <div className="w-1/6 card-body bg-base-300 rounded-box">
        <h2 className="card-title">Palette</h2>
        <ColorPalette onChange={(color) => setPencilColor(color)} />
        <div className="flex flex-col">
          BackgroundColor
          <InputColorRGBA onChange={(color) => setBackgroundColor(color)} color={backgroundColor}/>
        </div>
      </div>
      <div className="w-4/6 flex flex-col card-body bg-base-300 rounded-box">
        <h2 className="card-title">Drawing</h2>
        <ReactSketchCanvas
          ref={canvasRef}
          style={styles}
          width="100%"
          height="100%"
          strokeWidth={pencilThickness}
          eraserWidth={eraserThickness}
          strokeColor={pencilColor}
          canvasColor={backgroundColor}
        />
       </div>
      <div className="w-1/6 card-body bg-base-300 rounded-box">
        <h2 className="card-title">Actions</h2>
        <DrawerActionsPalette
          canvasRef={canvasRef}
          pencilThickness={pencilThickness}
          eraserThickness={eraserThickness}
          onChangePencilThickness={setPencilThickness}
          onChangeEraserThickness={setEraserThickness}
        />
      </div>
    </div>
  );
}

export default Drawer;
