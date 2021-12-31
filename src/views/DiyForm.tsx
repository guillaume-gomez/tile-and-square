import React, { useState } from 'react';
import { times } from "lodash";
import { useNavigate } from "react-router-dom";
import { Tiles } from "../CustomHooks/useTiles";

import SelectNbTilesForm from "./diyForm/SelectNbTilesForm";
import DrawerStepForm from "./diyForm/DrawerStepForm";
import RecapForm from "./diyForm/RecapForm";

function DiyForm() {
  const [step, setStep] = useState<number>(1);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const { addTile, reset } = Tiles.useContainer();
  const navigate = useNavigate();

  function renderStep() {
    if(currentStep === 0) {
      return <SelectNbTilesForm onSubmit={startDrawingPart} />;
    }
    if(currentStep === step) {
      return <RecapForm onSubmit={()=> navigate("/") } />
    }
    return <DrawerStepForm onSubmit={saveImage} />;
  }

  function textStep(itStep : number) {
    if(itStep === 0) {
      return "Number of tiles";
    }
    else if (itStep < step) {
      return `Tile n° ${itStep}`;
    }
    else {
      return "Finish";
    }
  }

  function saveImage(base64img: string) {
    addTile(base64img)
    setCurrentStep(currentStep + 1);
  }

  function startDrawingPart(nbStep: number) {
    setStep(nbStep + 1)
    setCurrentStep(currentStep + 1);
    //in that part of the app, make sure default tiles are flushed
    reset();
  }

  return (
    <div className="flex flex-col justify-items-center items-center gap-5">
      <h2 className="text-2xl font-bold pt-2">Create you artwork</h2>
      <ul className="w-full steps">
        {
          times(step + 1, (it) => 
            <li key={it} data-content="●" className={`step ${it <= currentStep ? "step-primary" : null}`}>{textStep(it)}</li>
          )
        }
      </ul>
      {renderStep()}
    </div>
   );
}

export default DiyForm;
