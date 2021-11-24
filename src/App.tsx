import React, { useState, useRef, useEffect } from 'react';

import Footer from './Components/Footer';
import Header from './Components/Header';
import Canvas from './Components/Canvas';
import SliderWithLabel from "./Components/SliderWithLabel";
import ColorPicker from "./Components/ColorPicker";

import { ExternalActionInterface } from "./interfaces";

function App() {
  const [speed, setSpeed] = useState<number>(25);
  const [play, setPlay] = useState<boolean>(true);
  const [backgroundColorClass, setBackgroundClass] = useState<string>("red-800");
  const [nbTilesWidth, setNbTileWidth] = useState<number>(4);
  const [fullScreen, setFullScreen] = useState<boolean>(false);
  const canvasActionsRef = useRef<ExternalActionInterface| null>(null);

  function resetPosition() {
    if(canvasActionsRef && canvasActionsRef.current) {
      canvasActionsRef.current.resetPosition();
    }
  }

  function resetAll() {
    if(canvasActionsRef && canvasActionsRef.current) {
      canvasActionsRef.current.resetAll();
    }
  }

  function playPause() {
    if(!canvasActionsRef || !canvasActionsRef.current) {
      return;
    }

    if(play) {
      canvasActionsRef.current.pause();
    }
    else {
      canvasActionsRef.current.play();
    }
    setPlay(!play);
  }

  function resizeCanvasfullScreen() {
    if(!canvasActionsRef || !canvasActionsRef.current) {
      return;
    }
    const width = window.innerWidth;
    const height = window.innerHeight;
    const value = Math.min(width, height) - 10;
    canvasActionsRef.current.resize(value, value);
    canvasActionsRef.current.scrollTo();
  }

  function resizeTiles(value: string) {
    setNbTileWidth(parseInt(value));
  }

  return (
    <div className="flex flex-col gap-5 bg-base-200 rounded-box p-2">
      <Header/>
      <div className="card shadow-lg compact side bg-base-100">
        <div className="card-body">
          <div className="flex flex-col items-center justify-items-center gap-10">
            <Canvas ref={canvasActionsRef} speed={speed} backgroundColorClass={backgroundColorClass} nbTilesWidth={nbTilesWidth} />
            <div className="flex flex-col gap-3 lg:w-1/3">
              <ColorPicker label="Select a background color" initialColorClass={backgroundColorClass} onChange={(colorClass) => setBackgroundClass(colorClass)}/>
              <button className="btn btn-primary" onClick={() => resetAll()}>Regenerate</button>
              <button className="btn btn-primary" onClick={() => playPause()}>{play ? "⏸" : "▶"}</button>
              <SliderWithLabel label="Speed" min={1} max={200} value={speed} step={0.5} onChange={(value) => setSpeed(parseInt(value))}/>
              <SliderWithLabel label="Nb Tiles Width" min={2} max={10} value={nbTilesWidth} step={1} onChange={resizeTiles}/>
              <button className="btn btn-primary" onClick={() => resetPosition()}>Reset Positions</button>
              <button className="btn btn-primary" onClick={() => { setFullScreen(!fullScreen); resizeCanvasfullScreen() }}>Full Screen</button>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default App;
