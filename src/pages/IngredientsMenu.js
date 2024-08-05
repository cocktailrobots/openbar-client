import React from 'react'
import useApiGet from '../hooks/useApiGet'
import { OpenBarConfig } from '../App'
import { Link, useNavigate } from 'react-router-dom'

export default function IngredientsMenu() {
  const [ingredients, ingErr] = useApiGet(OpenBarConfig.cocktails_api_host, "/ingredients", null, [])
  const navigate = useNavigate()

  return (
    <div>
      <div><Link to="/admin">&lt; Admin</Link></div>
      <div className='admin-div'>
        <div className='admin-menu-header-div'>
          <h1>Ingredients</h1>
          <hr/>
        </div>
        <div>
          <ul>
            {ingredients.map(ingredient => {
              return (
                <li key={ingredient.name}>
                  <div>{ingredient.display_name}</div>
                  <div>{ingredient.description}</div>
                  <div><Link to={"/ingredients/" + ingredient.name}>edit</Link></div>
                </li>
              )}
            )}
          </ul>
          <div className='align-center'>
            <button className='btn' onClick={evt => navigate('/ingredients/new')}>New</button>
          </div>
        </div>
      </div>
    </div>
  )
}