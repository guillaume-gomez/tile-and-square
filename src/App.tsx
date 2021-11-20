import React, { useState } from 'react';

import Footer from './Components/Footer';
import Header from './Components/Header';
import Canvas from './Components/Canvas';
import SliderWithLabel from "./Components/SliderWithLabel";
import ColorPicker from "./Components/ColorPicker";

function App() {
  const [speed, setSpeed] = useState<number>(1);
  const [play, setPlay] = useState<boolean>(true);
  const [reset, setReset] = useState<boolean>(false);
  const [backgroundColorClass, setBackgroundClass] = useState<string>("red-800");
  return (
    <div className="bg-base-200 rounded-box p-2">
      <Header/>
      <div className="card shadow-lg compact side bg-base-100 p-2">
        <div className="card-body">
          <div className="flex flex-col items-center justify-items-center gap-8">
            <Canvas speed={speed} play={play} reset={reset} backgroundColorClass={backgroundColorClass} />
            <div className="flex flex-col gap-2 w-1/3">
              <ColorPicker label="Select a background color" initialColorClass={backgroundColorClass} onChange={(colorClass) => setBackgroundClass(colorClass)}/>
              <button className="btn btn-primary" onClick={() => setPlay(!play)}>{play ? "Stop" : "Play"}</button>
              <SliderWithLabel label="Speed" min={1} max={100} value={speed} step={0.5} onChange={(value) => setSpeed(parseInt(value))}/>
              <button className="btn btn-primary" onClick={() => setReset(!reset)}>Reset</button>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default App;
