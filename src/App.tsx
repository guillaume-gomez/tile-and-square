import React from 'react';
// using HashRouter instead of browserroute to avoid url conflict in github-pages
import {
  HashRouter,
  Routes,
  Route
} from "react-router-dom";
import Artwork from "./views/Artwork";
import DiyForm from "./views/DiyForm";
import Layout from "./views/Layout";
import { Tiles } from "./CustomHooks/useTiles";

function App() {
  return (
  <HashRouter>
    <Tiles.Provider>
      <Routes>
        <Route path="/" element={<Layout />}>
            <Route path="diy" element={<DiyForm />} />
            <Route index element={<Artwork />} />
          </Route>
        
      </Routes>
    </Tiles.Provider>
  </HashRouter>
  )
}

export default App;
