import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'
import LightRays from '../LightRays';
import { useTheme } from '../../context/ThemeContext';
import NavbarOld from '../Navbar/NavbarOld';

function Layout() {
  const { theme } = useTheme();
    console.log("Layout rendered");
  return (
<>
        <div className={`theme-background inset-0 z-0 fixed ${theme === 'old' ? 'theme-background-old' : 'bg-gradient-to-t from-[#000000ea] to-[#8683832e]'}`}>
            {theme === 'modern' && <LightRays
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
          />}
        </div>

    <div>
        {theme === 'old' ? <NavbarOld /> : <Navbar/>}
      <div className=""><Outlet/>
        </div>
    </div></>
  )
}

export default Layout