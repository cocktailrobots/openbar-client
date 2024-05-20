import React from 'react'
import { Link } from 'react-router-dom'

export default function AdminMenu() {
  return (
    <div>
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
    </div>
  )
}
