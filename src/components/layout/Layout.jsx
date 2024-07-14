import React from 'react'
import { Outlet } from 'react-router-dom'
import { Footer, Navbar } from '../component'


function Layout() {
  return (
    <div>
        <Navbar/>
        <Outlet />
        <Footer />
    </div>
  )
}

export default Layout