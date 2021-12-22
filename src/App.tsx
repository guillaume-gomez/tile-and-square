import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Artwork from "./views/Artwork";
import DiyForm from "./views/DiyForm";

function App() {
  return (
  <BrowserRouter>
    <Routes>
      <Route path="*" element={<Artwork />} />
      <Route path="/diy" element={<DiyForm />} />
      
    </Routes>
  </BrowserRouter>
  )
}

export default App;
