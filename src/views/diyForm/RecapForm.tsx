import React from 'react';

interface RecapFormInterface {
  onSubmit: () => void;
}

function RecapForm({ onSubmit } : RecapFormInterface) {
  return (
   <div className="hero">
    <div className="text-center hero-content">
      <div className="max-w-md">
        <h2 className="mb-5 text-2xl font-bold">
            And it's done.
        </h2> 
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
