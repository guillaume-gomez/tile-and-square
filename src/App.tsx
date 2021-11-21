import React, { useState, useRef } from 'react';

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

  return (
    <div className="flex flex-col gap-5 bg-base-200 rounded-box p-2">
      <Header/>
      <div className="card shadow-lg compact side bg-base-100">
        <div className="card-body">
          <div className="flex flex-col items-center justify-items-center gap-8">
            <Canvas ref={canvasActionsRef} speed={speed} backgroundColorClass={backgroundColorClass} />
            <div className="flex flex-col gap-2 lg:w-1/3">
              <ColorPicker label="Select a background color" initialColorClass={backgroundColorClass} onChange={(colorClass) => setBackgroundClass(colorClass)}/>
              <SliderWithLabel label="Speed" min={1} max={200} value={speed} step={0.5} onChange={(value) => setSpeed(parseInt(value))}/>
              <button className="btn btn-primary" onClick={() => playPause()}>{play ? "⏸" : "▶"}</button>
              <button className="btn btn-primary" onClick={() => resetPosition()}>Reset Positions</button>
              <button className="btn btn-primary" onClick={() => resetAll()}>Reset Positions</button>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default App;
