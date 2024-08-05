import React, { useEffect, useState } from 'react'
import { getFromApi, patchJsonToApi } from '../utils/api'
import { OpenBarConfig } from '../App'
import { Link } from 'react-router-dom'

export default function InfoMenu() {  
  const [networking, setNetworking] = useState({
      wifi_ssid: "",
      wifi_addr: "",
      wired_addr: ""
  })
  const [err, setErr] = useState(null)

  useEffect(() => {
    getFromApi(OpenBarConfig.openbar_api_host, "/networking", null).then(
      response => {
        response.json().then(data => {
          console.log(data)
          setNetworking(data)
        }).catch(err => setErr(err))
      }
    ).catch(err => setErr(err))
  }, [])

  function getNetworkingInfo(key) {
    // if networking contains key return networking[key]
    if (key in networking) {
      return networking[key]
    }

    return ""
  }

  return (
    <div>
      <div>
        <div><Link to="/admin">&lt; Admin</Link></div>
      </div>
        <div className='admin-div'>
        <div className='admin-menu-header-div'>
          <h1>Debug Info</h1>
          <hr/>
          <br/>
        </div>
        <div>
          <p>Wifi Network: {getNetworkingInfo("wifi_ssid")}</p>
        </div>
        <div>
          <p>Wifi Address: {getNetworkingInfo("wifi_addr")}</p>
        </div>
        <div>
          <p>Ethernet Address: {getNetworkingInfo("wired_addr")}</p>
        </div>
      </div>
    </div>
  )
}