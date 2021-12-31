import React, { useState, useRef } from 'react';
import { ReactSketchCanvas, ReactSketchCanvasRef } from 'react-sketch-canvas';
import ColorPalette from "./ColorPalette";
import InputColorRGBA from "./InputColorRGBA";
import DrawerActionsPalette from "./DrawerActionsPalette";

const styles = {
  //border: '0.0625rem solid #9c9c9c',
  //borderRadius: 'rounded-box',
};

interface DrawerInterface {
  onSubmit: (base64img: string) => void;
}

function Drawer({onSubmit} : DrawerInterface) {
  const [pencilColor, setPencilColor] = useState<string>("#000000FF");
  const [backgroundColor, setBackgroundColor] = useState<string>("#FFFFFFFF");
  const [transparentBackgroundColor, setTransparentBackgroundColor] = useState<boolean>(true);
  const [pencilThickness, setPencilThickness] = useState<number>(4);
  const [eraserThickness, setEraserThickness] = useState<number>(8);
  const canvasRef = useRef<ReactSketchCanvasRef>(null);

  async  function saveImage() {
     if(!canvasRef.current) {
      return;
    }
    const result = await canvasRef.current.exportImage("png");
    onSubmit(result);
    canvasRef.current.resetCanvas();
  }

  function toggleTransparent() {
    setTransparentBackgroundColor(!transparentBackgroundColor);
  }

  return (
    <div className="w-full flex gap-2 lg:flex-row sm:flex-col card-body rounded-box">
      <div className="lg:w-1/6 card-body bg-base-300 rounded-box">
        <h2 className="card-title">Palette</h2>
        <ColorPalette onChange={(color) => setPencilColor(color)} />
        <div className="flex flex-col">
          <p>BackgroundColor</p>
          <InputColorRGBA onChange={(color) => setBackgroundColor(color)} color={backgroundColor}/>
          <div className="form-control">
            <label className="cursor-pointer label">
              <span className="label-text">No background</span>
              <input type="checkbox" checked={transparentBackgroundColor} onChange={toggleTransparent} className="checkbox" />
            </label>
          </div>
        </div>
      </div>
      <div className="lg:w-4/6 flex flex-col gap-2 card-body bg-base-300 rounded-box">
        <h2 className="card-title">Drawing</h2>
        <ReactSketchCanvas
          ref={canvasRef}
          style={styles}
          width="100%"
          height="100%"
          strokeWidth={pencilThickness}
          eraserWidth={eraserThickness}
          strokeColor={pencilColor}
          canvasColor={transparentBackgroundColor ? "transparent" : backgroundColor}
        />
        <div className="flex flex-row-reverse">
          <div className="btn btn-primary" onClick={saveImage} >
            Save
          </div>
        </div>
       </div>
      <div className="lg:w-1/6 card-body bg-base-300 rounded-box">
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
