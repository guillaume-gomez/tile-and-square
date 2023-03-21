import React, { useState, useEffect } from 'react';

interface RecapFormInterface {
  onSubmit: () => void;
  tiles: string[]
}

function RecapForm({ onSubmit, tiles } : RecapFormInterface) {
  return (
   <div className="hero">
    <div className="text-center hero-content">
      <div className="">
        <h2 className="mb-5 text-2xl font-bold">
            And it's done !! 🎉
        </h2> 
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        { tiles.map((tile, index) => {
            return (
              <div>
                <div style={{border: "10px solid black"}}>
                  <div style={{border: "20px solid white"}}>
                    <img src={tile} />
                  </div>
                </div>
                <span>Drawing of {index + 1}</span>
             </div>
            )
          })
        }
        </div>
        <p className="mb-5">
          Ready to show the result ?
        </p>
        <button className="btn btn-primary" onClick={onSubmit}><span className="text-2xl">🚀</span>Go !</button>
      </div>
    </div>
  </div>
  );
}

export default RecapForm;
