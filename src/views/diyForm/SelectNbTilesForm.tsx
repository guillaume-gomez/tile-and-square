import React, { useState } from 'react';

interface SelectNbTilesFormInterface {
  onSubmit: (nbStep: number) => void;
}

function SelectNbTilesForm({ onSubmit } : SelectNbTilesFormInterface) {
  const [step, setStep] = useState<number>(1);
  return (
   <div className="card-body">
      <h2 className="card-title">
        How many people will be there / How many tiles will you draw ?
      </h2>
      <div className="form-control">
        <label className="label">
          <span className="label-text">Number</span>
        </label> 
        <input type="number" placeholder="6" className="input input-primary input-bordered" value={step} onChange={(e) => setStep(parseInt(e.target.value))} />
      </div>
      <div className="justify-end card-actions">
        <button className="btn btn-primary" onClick={() => onSubmit(step)}>Submit</button>
      </div>
    </div>
  );
}

export default SelectNbTilesForm;
