import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import MenuForm from './MenuForm'
import ErrorDisplay from '../components/ErrorDisplay'
import { postJsonToApi } from '../utils/api'
import { OpenBarConfig } from '../App'

export default function MenuNew() {
  const navigate = useNavigate()
  const [errMsg, setErrMsg] = useState(null)
  const [menu, setMenu] = useState({
    name: "",
    ingredients: ["invalid"],
    items: []
  })

  function debugSetMenu(x) {
    console.log("setting menu", x)
    setMenu(x)
  }

  function handleSubmit(evt) {
    console.log("handle submit")
    setErrMsg(null)

    evt.preventDefault()
    console.log(menu)

    postJsonToApi(OpenBarConfig.openbar_api_host, "/menus", [menu]).then(
      () => navigate("/menus")
    ).catch(err => setErrMsg(err))
  }

  console.log("render menu new")
  const fluidsParam = menu.ingredients.join(",")
  return (
    <div>
      <MenuForm menu={menu} setMenu={debugSetMenu} fluidsParam={fluidsParam} onSubmit={handleSubmit} />
      <ErrorDisplay err={errMsg}/>      
    </div>
  )
}
