import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'
import LightRays from '../LightRays';
import Footer from '../Footer/Footer';

function Layout() {
    console.log("Layout rendered");
  return (
<>
        <div className=" inset-0 z-0 fixed bg-gradient-to-t from-[#000000ea]  to-[#8683832e]">
                  <LightRays
            raysOrigin="center"
            raysColor="#451545"
            raysSpeed={3}
            lightSpread={2}
            rayLength={2}
            followMouse={true}
            mouseInfluence={0.4}
            noiseAmount={0.1}
            distortion={0.05}
            className="w-full h-full"
          />
        </div>

    <div>
        <Navbar/>
      <div className=""><Outlet/>
        </div>  
        <Footer/>
    </div></>
  )
}

export default Layout