import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import ShutdownModal from './ShutdownModal'

export default function AdminMenu() {
  const [shutdownModalOpen, setShutdownModalOpen] = useState(false) 

  function changeModalOpen(newVal) {
    console.log("changeModalOpen", newVal)
    setShutdownModalOpen(newVal)
  }

  return (
    <div className='admin-div'>
      <div><Link to="/">&lt; Main Menu</Link></div>
      <div>
        <Link to="/ingredients">Ingredients</Link>
      </div>
      <div>
        <Link to="/cocktails">Cocktails</Link>
      </div>
      <div>
        <Link to="/recipes">Recipes</Link>
      </div>
      <div>
        <Link to="/fluids">Fluids</Link>
      </div>
      <div>
        <Link to="/menus">Menus</Link>
      </div>
      <div>
        <Link to="/buttons">Virtual Buttons</Link>
      </div>
      <div>
        <Link to="/config">Configuration</Link>
      </div>
      <div>
        <Link to="/info">Debug Info</Link>
      </div>
      <div>
        <p className="jslink" onClick={() => changeModalOpen(true)}>Shutdown</p>
      </div>
      <ShutdownModal open={shutdownModalOpen} handleModalClose={() => {changeModalOpen(false)}}/>
    </div>
  )
}
