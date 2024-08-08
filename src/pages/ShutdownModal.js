import React, { useEffect, useState } from 'react'
import Modal from 'react-modal'
import { postJsonToApi } from '../utils/api'
import { OpenBarConfig } from '../App'

export default function ShutdownModal({open, handleModalClose}) {
  function shutdown() {
    postJsonToApi(OpenBarConfig.openbar_api_host, "/shutdown", {}).then(response => {
      console.log("shutdown response:", response)
    }).catch(err => console.error(err))
  }

  return (
<Modal style={{
      overlay: {
        backgroundColor: 'black',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: '50px',
      },
      content: {
        backgroundColor: '#082640',
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
      }
    }} isOpen={open} onRequestClose={handleModalClose}>
{
  <div>
    <div>
      <button className='btn' onClick={shutdown}>Shutdown</button>
      <button className='btn btn-cancel' onClick={handleModalClose}>Close</button>
    </div>
  </div>
}
</Modal>
  )
}
