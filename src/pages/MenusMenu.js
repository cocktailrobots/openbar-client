import React from 'react'
import useApiGet from '../hooks/useApiGet'
import { OpenBarConfig } from '../App'
import { Link, useNavigate } from 'react-router-dom'

export default function MenusMenu() {
  const navigate = useNavigate()
  const [menus, menusErr] = useApiGet(OpenBarConfig.openbar_api_host, "/menus", null, [])

  return (
    <div>
      <div><Link to="/admin">&lt; Admin</Link></div>
      <div>
        <h1>Menus</h1>
      </div>
      <div>
        <ul>
          {menus.map(menu => {
            return (
              <li key={menu}>
                <div>{menu}</div>
                <div><Link to={"/menus/" + menu}>edit</Link></div>
              </li>
            )}
          )}
        </ul>
        <button onClick={evt => navigate('/menus/new')}>New</button>
      </div>
    </div>
  )
}
