import React from 'react'
import useApiGet from '../hooks/useApiGet'
import { OpenBarConfig } from '../App'
import { Link, useNavigate } from 'react-router-dom'

export default function RecipesMenu() {
  const [recipes, ingErr] = useApiGet(OpenBarConfig.cocktails_api_host, "/recipes", null, [])
  const navigate = useNavigate()

  return (
    <div>
      <div><Link to="/admin">&lt; Admin</Link></div>
      <div>
        <h1>Recipes</h1>
      </div>
      <div>
        <ul>
          {recipes.map(recipe => {
            return (
              <li key={recipe.id}>
                <div>{recipe.display_name}</div>
                <div>{recipe.description}</div>
                <div>{recipe.directions}</div>
                <div><Link to={"/recipes/" + recipe.id}>edit</Link></div>
              </li>
            )}
          )}
        </ul>
        <button onClick={evt => navigate('/recipes/new')}>New</button>
      </div>
    </div>
  )
}
