import React from 'react';
import { Outlet } from "react-router-dom";

import Footer from '../Components/Footer';
import Header from '../Components/Header';

function Layout() {
  return (
    <div className="flex flex-col min-h-screen gap-5 bg-base-200 rounded-box p-2">
      <Header/>
      <div className="card shadow-lg compact side bg-base-100 flex-grow">
        <Outlet />
      </div>
      <Footer/>
    </div>
  );
}

export default Layout;
