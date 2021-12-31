import React from 'react';
import Drawer from '../../Components/Drawer';

interface DrawerStepFormInterface {
  onSubmit: (base64img: string) => void;
}

function DrawerStepForm({ onSubmit } : DrawerStepFormInterface) {
  return (
    <div className="w-full">
      <Drawer onSubmit={onSubmit} />
    </div>
  );
}

export default DrawerStepForm;
