import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { times } from "lodash";
import Drawer from '../Components/Drawer';
import { Tiles } from "../CustomHooks/useTiles";


function DiyForm() {
  const [step, setStep] = useState<number>(1);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const { addTile, reset } = Tiles.useContainer();
  const navigate = useNavigate();

  useEffect(() => {
    // if all drawing are saved
    if(currentStep + 1 === step) {
      
    }
  }, [step, currentStep])

  function renderStep() {
    if(currentStep === 0) {
      return Form();
    }
    return DrawerStep();
  }

  function textStep(step : number) {
    if(step === 0) {
      return "Number of tiles";
    }
    else {
      return `Tile n° ${step}`;
    }
  }

  function DrawerStep() {
    return (
      <div className="w-full p-2">
        <ul className="w-full steps">
          {
            times(step + 1, (it) => 
              <li data-content="●" className={`step ${it <= currentStep ? "step-primary" : null}`}>{textStep(it)}</li>
            )
          }
        </ul>
        <Drawer onSubmit={saveImage} />
      </div>
    );
  }

  function saveImage(base64img: string) {
    addTile(base64img)
    setCurrentStep(currentStep + 1);
  }

  function startForm() {
    setCurrentStep(currentStep + 1);
    //in that part of the app, make sure default tiles are flushed
    reset();
  }

  function Form() {
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
          <button className="btn btn-primary" onClick={startForm}>Submit</button>
        </div>
      </div>
    );
  }


  return (
    <div className="flex flex-col justify-items-center items-center">
      <h2>Create you artwork</h2>
      {renderStep()}
      <button onClick={() => navigate("/")}>
        C'est fini mon gars
      </button>
    </div>
   );
}

export default DiyForm;
