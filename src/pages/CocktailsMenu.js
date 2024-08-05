import React from 'react'
import useApiGet from '../hooks/useApiGet'
import { OpenBarConfig } from '../App'
import { Link, useNavigate } from 'react-router-dom'

export default function CocktailsMenu() {
  const [cocktails, cockErr] = useApiGet(OpenBarConfig.cocktails_api_host, "/cocktails", null, [])
  const navigate = useNavigate()

  return (
    <div>
      <div><Link to="/admin">&lt; Admin</Link></div>
      <div className='admin-div'>
        <div className='admin-menu-header-div'>
          <h1>Cocktails</h1>
          <hr/>
        </div>
        <div>
          <ul>
            {cocktails.map(cocktail => {
              return (
                <li key={cocktail.name}>
                  <div>{cocktail.display_name}</div>
                  <div>{cocktail.description}</div>
                  <div><Link to={"/cocktails/" + cocktail.name}>edit</Link></div>
                </li>
              )}
            )}
          </ul>
          <div className='align-center'>
            <button className='btn' onClick={evt => navigate('/cocktails/new')}>New</button>
          </div>
        </div>
      </div>
    </div>
  )
}