import React, { useState } from 'react'
import useApiGet from '../hooks/useApiGet'
import { OpenBarConfig } from '../App'
import { useNavigate, useParams } from 'react-router-dom'
import MenuForm from './MenuForm'
import ErrorDisplay from '../components/ErrorDisplay'
import { patchJsonToApi } from '../utils/api'

export default function EditMenu() {
  const {id} = useParams()
  const navigate = useNavigate()
  const [errMsg, setErrMsg] = useState(null)
  const [menu, getErr,, setMenu] = useApiGet(OpenBarConfig.openbar_api_host, "/menus/" + id, null, null)

  if (menu === null) {
    return null
  }

  console.log(menu)
  function handleSubmit(evt) {
    setErrMsg(null)

    evt.preventDefault()
    console.log(menu)

    patchJsonToApi(OpenBarConfig.openbar_api_host, "/menus/" + id, menu).then(
      () => navigate("/menus")
    ).catch(err => setErrMsg(err))
  }

  const fluidsParam = menu.ingredients.join(",")
  return (
    <div>
      <MenuForm menu={menu} onSubmit={handleSubmit} fluidsParam={fluidsParam} setMenu={setMenu}/>
      <ErrorDisplay err={errMsg}/>
    </div>
  )
}
