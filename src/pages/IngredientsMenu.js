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
      <div>
        <h1>Ingredients</h1>
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
        <button onClick={evt => navigate('/ingredients/new')}>New</button>
      </div>
    </div>
  )
}