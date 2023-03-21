import React, { useState, RefObject } from 'react';
import { ReactSketchCanvasRef } from 'react-sketch-canvas';
import SliderWithLabel from "./SliderWithLabel";

interface DrawerActionsPaletteInterface {
  canvasRef: RefObject<ReactSketchCanvasRef>;
  pencilThickness: number;
  eraserThickness: number;
  onChangePencilThickness: (newValue: number) => void;
  onChangeEraserThickness: (newValue: number) => void;
}

function DrawerActionsPalette({
  canvasRef,
  pencilThickness,
  eraserThickness,
  onChangePencilThickness,
  onChangeEraserThickness
} : DrawerActionsPaletteInterface) {
  const [typeOfDrawing, setTypeOfDrawing] = useState<string>("pencil");

  function usePencil() {
    if(!canvasRef.current) {
      return;
    }
    canvasRef.current.eraseMode(false);
    setTypeOfDrawing("pencil");
  }

  function undo() {
    if(!canvasRef.current) {
      return;
    }
    canvasRef.current.undo();
  }

  function redo() {
    if(!canvasRef.current) {
      return;
    }
    canvasRef.current.redo();
  }

  function useEraser() {
    if(!canvasRef.current) {
      return;
    }
    canvasRef.current.eraseMode(true);
    setTypeOfDrawing("eraser");
  }

  function reset() {
    if(!canvasRef.current) {
      return;
    }
    canvasRef.current.clearCanvas();
  }

  return (
      <div className="w-full h-full flex flex-col gap-8">
        <div className="grid grid-cols-2 gap-2">
          <div className={`btn ${typeOfDrawing === "pencil" ? "btn-primary " : "btn-outline" } `} onClick={usePencil}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M21.2635 2.29289C20.873 1.90237 20.2398 1.90237 19.8493 2.29289L18.9769 3.16525C17.8618 2.63254 16.4857 2.82801 15.5621 3.75165L4.95549 14.3582L10.6123 20.0151L21.2189 9.4085C22.1426 8.48486 22.338 7.1088 21.8053 5.99367L22.6777 5.12132C23.0682 4.7308 23.0682 4.09763 22.6777 3.70711L21.2635 2.29289ZM16.9955 10.8035L10.6123 17.1867L7.78392 14.3582L14.1671 7.9751L16.9955 10.8035ZM18.8138 8.98525L19.8047 7.99429C20.1953 7.60376 20.1953 6.9706 19.8047 6.58007L18.3905 5.16586C18 4.77534 17.3668 4.77534 16.9763 5.16586L15.9853 6.15683L18.8138 8.98525Z" fill="currentColor" /><path d="M2 22.9502L4.12171 15.1717L9.77817 20.8289L2 22.9502Z" fill="currentColor" /></svg>
          </div>
          <div className={`btn ${typeOfDrawing === "eraser" ? "btn-primary " : "btn-outline" } `} onClick={useEraser}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M3.49997 12.8995C2.71892 13.6805 2.71892 14.9468 3.49997 15.7279L7.35785 19.5858H4.08576C3.53347 19.5858 3.08576 20.0335 3.08576 20.5858C3.08576 21.1381 3.53347 21.5858 4.08576 21.5858H20.0858C20.638 21.5858 21.0858 21.1381 21.0858 20.5858C21.0858 20.0335 20.638 19.5858 20.0858 19.5858H10.9558L20.4705 10.071C21.2516 9.28999 21.2516 8.02366 20.4705 7.24261L16.2279 2.99997C15.4468 2.21892 14.1805 2.21892 13.3995 2.99997L3.49997 12.8995ZM7.82579 11.4021L4.91418 14.3137L9.15683 18.5563L12.0684 15.6447L7.82579 11.4021ZM9.24 9.98787L13.4826 14.2305L19.0563 8.65683L14.8137 4.41418L9.24 9.98787Z" fill="currentColor" /></svg>
          </div>
          <div className="btn btn-outline" onClick={undo}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10.6013 6.84996C10.6023 5.74539 11.4986 4.85079 12.6032 4.85181L20.6032 4.8592L20.605 2.8592L12.605 2.85181C10.3959 2.84977 8.60335 4.63897 8.60131 6.84811L8.59179 17.1538L4.81054 13.3656L3.39502 14.7785L9.7531 21.1483L16.1229 14.7902L14.71 13.3747L10.5915 17.4856L10.6013 6.84996Z" fill="currentColor" /></svg>
          </div>
          <div className="btn btn-outline" onClick={redo}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.3987 6.84996C13.3977 5.74539 12.5014 4.85079 11.3969 4.85181L3.39687 4.8592L3.39502 2.8592L11.395 2.85181C13.6042 2.84977 15.3967 4.63897 15.3987 6.84811L15.4082 17.1538L19.1895 13.3656L20.605 14.7785L14.2469 21.1483L7.87709 14.7902L9.28999 13.3747L13.4085 17.4856L13.3987 6.84996Z" fill="currentColor" /></svg>
          </div>
          <div className="btn btn-outline" onClick={reset}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.56079 10.6418L6.35394 3.94971L8.25402 5.84979C11.7312 3.6588 16.3814 4.07764 19.41 7.1063L17.9958 8.52052C15.7536 6.27827 12.3686 5.87519 9.71551 7.31128L11.2529 8.84869L4.56079 10.6418Z" fill="currentColor" /><path d="M19.4392 13.3581L17.646 20.0502L15.7459 18.1501C12.2688 20.3411 7.61857 19.9223 4.58991 16.8936L6.00413 15.4794C8.24638 17.7217 11.6313 18.1247 14.2844 16.6887L12.747 15.1512L19.4392 13.3581Z" fill="currentColor" /></svg>
          </div>
        </div>
        <SliderWithLabel label="Pencil tickness" value={pencilThickness} onChange={(value) =>onChangePencilThickness(value)}/>
        <SliderWithLabel label="Eraser thickness" value={eraserThickness} onChange={(value) => onChangeEraserThickness(value)}/>
       </div>
  );
}

export default DrawerActionsPalette;
