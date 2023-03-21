import React, { useState, useRef } from 'react';
import Canvas from '../Components/Canvas';
import SliderWithLabel from "../Components/SliderWithLabel";
import ColorPicker from "../Components/ColorPicker";
import { useFullscreen } from "rooks";

import { ExternalActionInterface } from "../interfaces";

import { Tiles } from "../CustomHooks/useTiles";

function Artwork() {
  const [speed, setSpeed] = useState<number>(0.025);
  const [play, setPlay] = useState<boolean>(true);
  const [backgroundColorClass, setBackgroundClass] = useState<string>("red-800");
  const [nbTilesWidth, setNbTileWidth] = useState<number>(5);
  const [showOverlay, setShowOverlay] = useState<boolean>(false);
  const {
    isFullscreen,
    toggle
  } = useFullscreen();
  const { tiles } = Tiles.useContainer();

  const container = useRef<HTMLDivElement>(null);
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
    <div ref={container} className="card shadow-lg compact side bg-base-100">
      <div className="card-body">
        <div className="flex flex-col items-center justify-items-center gap-10">
          <div className="absolute top-8">
            <button onMouseEnter={() => setShowOverlay(true)} 
              className={`${showOverlay ? "hidden" : "" }transform -translate-y-20 transition duration-500 ease-in-out btn btn-primary`}
              onClick={() => container.current && toggle(container.current)}
            >
              {isFullscreen ? "Disable Full Screen" : "Enable Full Screen"}
            </button>
          </div>
          <div
            onMouseEnter={() => setShowOverlay(true)}
            onMouseLeave={() => setShowOverlay(false)}
          >
            <Canvas
              ref={canvasActionsRef}
              speed={speed}
              backgroundColorClass={backgroundColorClass}
              nbTilesWidth={nbTilesWidth}
              tileCollection={tiles}
            />
          </div>
          <div className="flex flex-col gap-3 lg:w-1/3">
            <ColorPicker label="Select a background color" initialColorClass={backgroundColorClass} onChange={(colorClass) => setBackgroundClass(colorClass)}/>
            <button className="btn btn-primary" onClick={() => resetAll()}>Regenerate</button>
            <button className="btn btn-primary" onClick={() => playPause()}>{play ? "⏸" : "▶"}</button>
            <SliderWithLabel float={true} label="Speed" min={0} max={3} value={speed} step={0.001} onChange={(value) => setSpeed(value)}/>
            <SliderWithLabel label="Nb Tiles Width" min={2} max={10} value={nbTilesWidth} step={1} onChange={(value) => setNbTileWidth(value)}/>
            <button className="btn btn-primary" onClick={() => resetPosition()}>Reset Positions</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Artwork;
