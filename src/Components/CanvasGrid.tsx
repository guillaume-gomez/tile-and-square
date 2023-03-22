/* eslint-disable react/prop-types */
import React, { useRef, useEffect } from 'react';

interface CanvasGridInterface {
 thickness?: number;
 gridSize?: number; 
}

// unused for the moment
function CanvasGrid({ thickness = 2, gridSize = 20 }: CanvasGridInterface) {
  const gridCanvasRef = useRef<HTMLCanvasElement>(null);


  useEffect(() => {
    generateXYAxis();
    //generateArtwork();
  }, []);

  function generateXYAxis() {
    const { current } = gridCanvasRef;
    if(!current) {
      return;
    }
    const { width, height } = current;
    const context = current.getContext("2d");
    if(!context) {
      return;
    }

    context.lineWidth = thickness;
    context.strokeStyle = "rgba(2,7,159, 0.5)";
    
    context.beginPath();
    context.moveTo(0, height/2 + thickness/2);
    context.lineTo(width, height/2 + thickness/2);
    context.stroke();

    context.beginPath();
    context.moveTo(width/2 - thickness/2, 0);
    context.lineTo(width/2 - thickness/2, height);
    context.stroke();

    for(let x = 0; x <= width; x+= gridSize) {
      // to the right
      context.beginPath();
      context.moveTo(width/2 - thickness/2 + x, 0);
      context.lineTo(width/2 - thickness/2 + x, height);
      context.stroke();

      //to the left
      context.beginPath();
      context.moveTo(width/2 - thickness/2 - x, 0);
      context.lineTo(width/2 - thickness/2 - x, height);
      context.stroke();
    }

    for(let y = 0; y <= height; y+= gridSize) {
      // to the right
      context.beginPath();
      context.moveTo(0, height/2 + thickness/2 + y);
      context.lineTo(width, height/2 + thickness/2 + y);
      context.stroke();

      //to the left
      context.beginPath();
      context.moveTo(0, height/2 + thickness/2 - y);
      context.lineTo(width, height/2 + thickness/2 - y);
      context.stroke();
    }
  }

  return (
    <canvas ref={gridCanvasRef} style={{position: "absolute", width: "100%", height: "100%", background: "transparent"}} />
  );
};

export default CanvasGrid;
