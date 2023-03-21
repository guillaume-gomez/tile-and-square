import React, { useState, useRef } from 'react';
import { ReactSketchCanvas, ReactSketchCanvasRef } from 'react-sketch-canvas';
import ColorPalette from "./ColorPalette";
import CanvasGrid from "./CanvasGrid";
import InputColorRGBA from "./InputColorRGBA";
import DrawerActionsPalette from "./DrawerActionsPalette";

const styles = {
  alignSelf: "center",
  border: "5px solid black"
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
  const [displayGrid, setDisplayGrid] = useState<boolean>(false);
  const canvasRef = useRef<ReactSketchCanvasRef>(null);

  async  function saveImage() {
     if(!canvasRef.current) {
      return;
    }
    const result = await canvasRef.current.exportImage("png");
    onSubmit(result);
    if(canvasRef && canvasRef.current) {
      canvasRef.current.resetCanvas();
    }
  }

  function toggleTransparent() {
    setTransparentBackgroundColor(!transparentBackgroundColor);
  }

  return (
    <div className="w-full flex gap-2 lg:flex-row sm:flex-col card-body rounded-box">
      <div className="lg:w-1/6 card-body bg-base-300 rounded-box">
        <h2 className="card-title">Palette</h2>
        <div className="flex flex-col gap-8">
          <ColorPalette onChange={(color) => setPencilColor(color)} />
          <div>
            <div className="text-base font-bold">BackgroundColor</div>
            <InputColorRGBA onChange={(color) => setBackgroundColor(color)} color={backgroundColor}/>
          </div>
          <div className="form-control">
            <label className="cursor-pointer label">
              <span className="label-text text-base">No background</span>
              <input type="checkbox" checked={transparentBackgroundColor} onChange={toggleTransparent} className="checkbox" />
            </label>
          </div>
          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text">Show Grid</span>
              <input
                type="checkbox"
                className="toggle"
                onChange={() => setDisplayGrid(!displayGrid)}
                disabled={!transparentBackgroundColor}
                checked={displayGrid}
              />
            </label>
          </div>
        </div>
      </div>
      <div className="lg:w-4/6 flex flex-col gap-2 card-body bg-base-300 rounded-box">
        <h2 className="card-title">Drawing</h2>
        <div className="flex flex-col w-full h-full">
          <ReactSketchCanvas
            ref={canvasRef}
            style={styles}
            width="800px"
            height="800px"
            strokeWidth={pencilThickness}
            eraserWidth={eraserThickness}
            strokeColor={pencilColor}
            backgroundImage={transparentBackgroundColor && displayGrid ? "https://upload.wikimedia.org/wikipedia/commons/7/70/Graph_paper_scan_1600x1000_%286509259561%29.jpg" : undefined}
            canvasColor={transparentBackgroundColor ? "transparent" : backgroundColor}
          />
          <div className="flex flex-row-reverse">
            <div className="btn btn-primary" onClick={saveImage} >
              Save
            </div>
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
