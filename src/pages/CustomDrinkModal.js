import React, { useEffect, useState } from 'react'
import Modal from 'react-modal'
import { flOzToMl, mlToFlOz } from '../utils/conversions'

export default function CustomDrinkModal({recipe, handleModalClose, makeDrink, isMaking, fluids, volMl}) {
  const [fluidNameToInfo, setFluidNameToInfo] = useState(new Map())
  const [volume, setVolume] = useState(mlToFlOz(volMl))

  console.log("recipe", recipe)
  console.log("fluids", fluids)
  useEffect(() => {
    const fluidMap = new Map()
    fluids.forEach(fluid => {
      if (fluid.id !== "empty") {
        fluidMap.set(fluid.id, {displayName: fluid.name, amount: 0})
      }
    })

    console.log(fluidMap)
    if (recipe !== null && recipe.id !== -1) {
      for (let i = 0; i < recipe.ingredients.length; i++) {
        const ing = recipe.ingredients[i]
        const existing = fluidMap.get(ing.name)
        console.log(ing.name)
        fluidMap.set(ing.name, {displayName: existing.displayName, amount: ing.amount})
      }
    }

    setFluidNameToInfo(fluidMap)
  }, [recipe, fluids])

  if (fluidNameToInfo.size === 0) {
    return null
  }

  let name = "Drink"
  if (recipe !== null && recipe.id !== -1) {
    name = recipe.display_name
  }

  const fluidNames = Array.from(fluidNameToInfo.keys())

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
    }} isOpen={recipe !== null} onRequestClose={handleModalClose}>
{
  <div>
    <h3 className='menu-modal-cocktailname'>Custom {name}</h3>
    <div className='menu-modal-buttons-div'>
      <table>
        <thead><tr><th></th><th>Parts</th></tr></thead>
        <tbody>
          {fluidNames.map(fluidName => {
            const info = fluidNameToInfo.get(fluidName)
            const amount = info.amount
            return (
              <tr key={fluidName}>
                <td><label>{info.displayName}</label></td>
                <td>
                  <input type='number' step='0.25' min='0' value={amount} id={fluidName} onChange={e => {
                    const newAmount = parseFloat(e.target.value)
                    const newInfo = fluidNameToInfo.get(fluidName)
                    newInfo.amount = newAmount
                    setFluidNameToInfo(new Map(fluidNameToInfo))
                  }}/>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
      <div className='menu-modal-buttons-div'>
        <label>Drink Size</label>
      </div>
      <div className='menu-modal-buttons-div'>
        <input type='number' step='0.25' min='0' value={volume} onChange={e => {
          setVolume(parseFloat(e.target.value))
        }}/>oz
      </div>
      <button className='btn btn-padded-right' onClick={() => {
          const customIngredients = []
          fluidNameToInfo.forEach((value, key) => {
            if (value.amount > 0) {
              customIngredients.push({name: key, amount: value.amount})
            }
          })
          makeDrink(customIngredients, flOzToMl(volume))
        }}
        disabled={isMaking}>Make Drink</button>
      <button className='btn btn-cancel' onClick={handleModalClose} disabled={isMaking}>Close</button>
    </div>
  </div>
}
</Modal>
  )
}
