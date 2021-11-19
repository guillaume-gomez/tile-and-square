import React from 'react';

import Footer from './Components/Footer';
import Header from './Components/Header';
import Canvas from './Components/Canvas';

function App() {
  return (
    <div className="bg-base-200 rounded-box p-2">
      <Header/>
      <div className="card shadow-lg compact side bg-base-100 p-2">
        <div className="card-body">
          <div className="flex flex-col items-center justify-items-center">
            <Canvas />
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default App;
