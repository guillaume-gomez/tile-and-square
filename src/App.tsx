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
  const [showOverlay, setShowOverlay] = useState<boolean>(false);
  const container = useRef<HTMLDivElement>(null);
  const canvasActionsRef = useRef<ExternalActionInterface| null>(null);

  useEffect(() => {
    function fullscreenCallback() {
      console.log(document.fullscreenElement)
      if (document.fullscreenElement) {
        setFullScreen(true)
      } else {
        setFullScreen(false)
      }
    }
    container!.current!.addEventListener('fullscreenchange', fullscreenCallback);
    return () => container!.current!.removeEventListener('fullscreenchange', fullscreenCallback);
  }, [container])

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

  function ToggleFullScreen() {
    if(fullScreen || document.fullscreenElement) {
      CloseFullScreen();
    } else {
      SetFullScreen();
    }
  }

  function SetFullScreen() {
    if(!container || !container.current) {
      return;
    }
    if(!document.fullscreenElement) {
      container.current.requestFullscreen({ navigationUI: "show" })
      .then(() => {
        if(canvasActionsRef && canvasActionsRef.current) {
          canvasActionsRef.current.scrollTo();
        }
      })
    }
  }

  function CloseFullScreen() {
    if(!container || !container.current) {
      return;
    }
    if (document.fullscreenElement) {
      document.exitFullscreen()
        .then(() => {
        if(canvasActionsRef && canvasActionsRef.current) {
          canvasActionsRef.current.scrollTo();
        }
      })
    }
  }

  function resizeTiles(value: string) {
    setNbTileWidth(parseInt(value));
  }

  return (
    <div ref={container} className="flex flex-col gap-5 bg-base-200 rounded-box p-2">
      { !fullScreen ? <Header/> : null }
      <div className="card shadow-lg compact side bg-base-100">
        <div className="card-body">
          <div className="flex flex-col items-center justify-items-center gap-10">
            <div className="absolute top-8">
              <button onMouseEnter={() => setShowOverlay(true)} className={`${showOverlay ? "hidden" : "" }transform -translate-y-20 transition duration-500 ease-in-out btn btn-primary`} onClick={() => ToggleFullScreen() }>{fullScreen ? "Disable Full Screen" : "Enable Full Screen"}</button>
            </div>
            <div
              onMouseEnter={() => setShowOverlay(true)}
              onMouseLeave={() => setShowOverlay(false)}
            >
              <Canvas ref={canvasActionsRef} speed={speed} backgroundColorClass={backgroundColorClass} nbTilesWidth={nbTilesWidth} />
            </div>
            <div className="flex flex-col gap-3 lg:w-1/3">
              <ColorPicker label="Select a background color" initialColorClass={backgroundColorClass} onChange={(colorClass) => setBackgroundClass(colorClass)}/>
              <button className="btn btn-primary" onClick={() => resetAll()}>Regenerate</button>
              <button className="btn btn-primary" onClick={() => playPause()}>{play ? "⏸" : "▶"}</button>
              <SliderWithLabel label="Speed" min={1} max={200} value={speed} step={0.5} onChange={(value) => setSpeed(parseInt(value))}/>
              <SliderWithLabel label="Nb Tiles Width" min={2} max={10} value={nbTilesWidth} step={1} onChange={resizeTiles}/>
              <button className="btn btn-primary" onClick={() => resetPosition()}>Reset Positions</button>
            </div>
          </div>
        </div>
      </div>
      { !fullScreen ? <Footer/> : null }
    </div>
  );
}

export default App;
