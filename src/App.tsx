import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Artwork from "./views/Artwork";
import DiyForm from "./views/DiyForm";
import Layout from "./views/Layout";

function App() {
  return (
  <BrowserRouter>
    <Routes>
      <Route path="tile-and-square" element={<Layout />}>
        <Route path="diy" element={<DiyForm />} />
        <Route index element={<Artwork />} />
      </Route>
      <Route path="*" element={<Artwork />} />
    </Routes>
  </BrowserRouter>
  )
}

export default App;
