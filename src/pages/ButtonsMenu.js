import React, { useEffect, useRef, useState } from 'react'
import { OpenBarConfig } from '../App'
import { apiGetMany, patchJsonToApi, postJsonToApi } from '../utils/api'
import { Link, useNavigate } from 'react-router-dom'
import ErrorDisplay from '../components/ErrorDisplay'

export default function ButtonsMenu() {
  const navigate = useNavigate()
  const [config, setConfig] = useState(null)
  const [fluids, setFluids] = useState(null)
  const [ingredients, setIngredients] = useState(null)
  const [errMsg, setErrMsg] = useState(null)
  const [checked, setChecked] = useState([])
  const [intervalId, setIntervalId] = useState(null)
  const [duration, setDuration] = useState(1000)
  const [reverse, setReverse] = useState(false)

  useEffect(() => {
    window.addEventListener('mouseup', stopPumps)
    const toGet = [
      {name:"ingredients", host:OpenBarConfig.cocktails_api_host, path:"/ingredients", params:null},
      {name:"fluids", host:OpenBarConfig.openbar_api_host, path:"/fluids", params:null},
      {name:"config", host:OpenBarConfig.openbar_api_host, path:"/config", params:null},
    ]
    apiGetMany(toGet).then(results => {
      console.log(results)
      setConfig(results.config)
      setFluids(results.fluids)
      setIngredients(results.ingredients)
    }).catch(err => setErrMsg(err.message))
  }, [])

  if (ingredients == null || fluids == null || config == null) {
    console.log("ingredients:", ingredients, "fluids:", fluids, "config", config)
    return (
      <ErrorDisplay err={errMsg}/>
    )
  } 

  function updatePumps() {
    const pumpIndexes = []
    for (let i = 0; i < checked.length; i++) {
      if (checked[i]) {
        pumpIndexes.push(i)
      }
    }

    postJsonToApi(OpenBarConfig.openbar_api_host, "/buttons", {
      depressed_buttons: pumpIndexes, 
      duration_ms: 250,
      async: true,
      forward: !reverse
    }).catch(err => setErrMsg(err))
    
    const iid = setTimeout(updatePumps, 100)
    setIntervalId(iid)
  }
  
  function runPumps(e) {
    e.preventDefault()
    const iid = setTimeout(updatePumps, 100)
    setIntervalId(iid)
  }

  function runPumpsForTime(e) {
    const pumpIndexes = []
    for (let i = 0; i < checked.length; i++) {
      if (checked[i]) {
        pumpIndexes.push(i)
      }
    }

    postJsonToApi(OpenBarConfig.openbar_api_host, "/buttons", {
      depressed_buttons: pumpIndexes, 
      duration_ms: duration, 
      async: false, 
      forward: !reverse
    }).catch(err => setErrMsg(err))
  }

  function stopPumps(e) {
    e.preventDefault()
    if (intervalId) {
      clearInterval(intervalId)
      setIntervalId(null)
    }
  }

  function checkChanged(e, i) {
    let newChecked = [...checked]
    newChecked[i] = e.target.checked
    setChecked(newChecked)
  }

  if (checked.length === 0) {
    let newChecked = []
    for (let i = 0; i < fluids.length; i++) {
      newChecked.push(false)
    }
    setChecked(newChecked)
  }

  return (
    <div onMouseUp={stopPumps}>
      <div><Link to="/admin">&lt; Admin</Link></div>
      <div className='admin-div'>
        <div className='admin-menu-header-div'>
          <h1>Fluids</h1>
          <hr/>
        </div>
        {fluids.map((fluid, i) => {
          return (
              <div key={i}>
                <span className='admin-checkbox-span'><input className="admin-checkbox" type='checkbox' defaultChecked={checked[i]} onChange={e => checkChanged(e,i)} /></span>
                <label>Fluid {i} - </label>
                <label>{fluid.name}</label>
              </div>
            )
        })}
        <br/>
        <div>
          <input className='inpt' type="number" value={duration} onChange={e => setDuration(parseInt(e.target.value))} />
          <button onMouseDown={runPumpsForTime} className='btn'>Run Pumps For Time (ms)</button>
        </div>
        { /*
        <div>
          <button onMouseDown={runPumps} >Run Pumps</button>
        </div>
        
         <div>
          <input className="admin-checkbox" type="checkbox" defaultChecked={reverse} onChange={e => setReverse(e.target.checked)} />
          <label>Reverse</label>
        </div>
        <ErrorDisplay err={errMsg}/> */
        }
      </div>
    </div>
  )
}
