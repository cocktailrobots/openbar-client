import React, { useEffect, useState } from 'react'
import { OpenBarConfig } from '../App'
import { apiGetMany, patchJsonToApi, postJsonToApi } from '../utils/api'
import { Link, useNavigate } from 'react-router-dom'
import ErrorDisplay from '../components/ErrorDisplay'

export default function FluidsMenu() {
  const navigate = useNavigate()
  const [currMenu, setCurrMenu] = useState("")
  const [config, setConfig] = useState(null)
  const [menus, setMenu] = useState(null)
  const [fluids, setFluids] = useState(null)
  const [ingredients, setIngredients] = useState(null)
  const [errMsg, setErrMsg] = useState(null)

  useEffect(() => {
    const toGet = [
      {name:"ingredients", host:OpenBarConfig.cocktails_api_host, path:"/ingredients", params:null},
      {name:"fluids", host:OpenBarConfig.openbar_api_host, path:"/fluids", params:null},
      {name:"menus", host:OpenBarConfig.openbar_api_host, path:"/menus", params:null},
      {name:"config", host:OpenBarConfig.openbar_api_host, path:"/config", params:null},
    ]
    apiGetMany(toGet).then(results => {
      console.log(results)
      setConfig(results.config)
      setMenu(results.menus)
      setFluids(results.fluids)
      setIngredients(results.ingredients)

      if ("current_menu" in results.config) {
        setCurrMenu(results.config.current_menu)
      } else {
        setCurrMenu("")
      }
    }).catch(err => setErrMsg(err.message))
  }, [])

  if (ingredients == null || fluids == null || menus == null || config == null) {
    console.log("ingredients:", ingredients, "fluids:", fluids, "menus:", menus, "config", config)
    return (
      <ErrorDisplay err={errMsg}/>
    )
  }

  function handleFluidChanged(fluidIdx, evt) {
    console.log("eventVal:", evt.target.value, "fluid_idx:", fluidIdx)
    const newFluids = [...fluids]
    let ingredient = ingredients.filter(ing => ing.name === evt.target.value)[0]
    if (!ingredient) {
      ingredient = {name: "empty", display_name: ""}
    }
    console.log(ingredient)
    newFluids[fluidIdx] = {id: ingredient.name, name: ingredient.display_name}
    setFluids(newFluids)
  }

  function handleMenuChanged(evt) {
    console.log("eventVal:", evt.target.value)
    setCurrMenu(evt.target.value)
  }

  function handleSubmit(evt) {
    setErrMsg(null)
    evt.preventDefault()

    const submitData = async () => {
      await postJsonToApi(OpenBarConfig.openbar_api_host, "/fluids", fluids)
      
      const newConfig = {...config, current_menu: currMenu}
      if ("current_menu" in config) {
        await patchJsonToApi(OpenBarConfig.openbar_api_host, "/config/current_menu", {"current_menu": currMenu})
      } else {
        await postJsonToApi(OpenBarConfig.openbar_api_host, "/config/current_menu", {"current_menu": currMenu})
      }

      setConfig(newConfig)
    }

    submitData().then(
      navigate("/admin")
    ).catch(err => setErrMsg(err.message))
  }

  function radioChecked(menu) {
    console.log(menu === currMenu)
    return menu === currMenu
  }

  while(fluids.length < config.num_pumps) {
    fluids.push({id: "empty", name: ""})
  }

  return (
    <div>
      <div><Link to="/admin">&lt; Admin</Link></div>
      <div className='admin-div'>
        <div className='admin-menu-header-div'>
          <h1>Fluids</h1>
          <hr/>
        </div>
        <table><tbody>
        {fluids.map((fluid, i) => {
          return (
              <tr key={i}>
                <td>Fluid {i}</td>
                <td>
                  <select value={fluid.id} onChange={evt => handleFluidChanged(i, evt)}>
                    <option value="empty"></option>
                    {ingredients.map(ingredient => {
                      return (
                        <option key={ingredient.name} value={ingredient.name}>{ingredient.display_name}</option>
                      )
                    })}
                  </select>
                </td>
              </tr>
            )
        })}
        </tbody></table>
        <div>
          {menus.map(menu => {
            return (
              <div key={menu}>
                <div><input type="radio" name="current_menu" value={menu} checked={radioChecked(menu)} onChange={handleMenuChanged}/>{menu}</div>
              </div>
            )
          })}
        </div>
        <div>
          <button className="btn" onClick={handleSubmit}>Submit</button>
        </div>
        <ErrorDisplay err={errMsg}/>
      </div>
    </div>
  )
}
