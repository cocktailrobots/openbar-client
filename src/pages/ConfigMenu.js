import React, { useEffect, useState } from 'react'
import { getFromApi, patchJsonToApi } from '../utils/api'
import { OpenBarConfig } from '../App'
import { Link } from 'react-router-dom'

export default function ConfigMenu() {
  const [numPumps, setNumPumps] = useState(-1)
  const [volume, setVolume] = useState(-1)
  const [err, setErr] = useState(null)

  useEffect(() => {
    getFromApi(OpenBarConfig.openbar_api_host, "/config", null).then(
      response => {
        response.json().then(data => {
          console.log(data)
          setVolume(data.default_volume_ml)
          setNumPumps(data.num_pumps)
        }).catch(err => setErr(err))
      }
    ).catch(err => setErr(err))
  }, [])

  function saveConfig() {
    patchJsonToApi(OpenBarConfig.openbar_api_host, "/config", {default_volume_ml: volume, num_pumps: numPumps}).catch(err => setErr(err))
  }

  return (
    <div>
      <div>
        <div><Link to="/admin">&lt; Admin</Link></div>
      </div>
      <div>
        <label>Default Drink Volume</label> <input type="number" value={volume} onChange={evt => setVolume(evt.target.value)}/>
      </div>
      <div>
        <label>Num Pumps</label> <input type="number" value={numPumps} onChange={evt => setNumPumps(evt.target.value)}/>
      </div>
      <div>
        <button onClick={saveConfig}>Save</button>
      </div>
    </div>
  )
}
