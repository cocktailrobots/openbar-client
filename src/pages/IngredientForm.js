import React from 'react'
import { postJsonToApi } from '../utils/api'

export default function IngredientForm({ingredient, setIngredient, onSubmit, edit}) {
  if (ingredient === null) {
    return null
  }

  function handleNameChange(evt) {
    // lowercase evt.target.value and remove any non-alphanumeric characters before calling setName
    const lwr = evt.target.value.toLowerCase()
    const formatted = lwr.replace(/[^a-z0-9_]/g, '')
    setIngredient({...ingredient, name: formatted})
  }

  function handleDisplayNameChange(evt) {
    setIngredient({...ingredient, display_name: evt.target.value})
  }

  function handleDescriptionChange(evt) {
    setIngredient({...ingredient, description: evt.target.value})
  }

  return (
    <form onSubmit={onSubmit}>
      <div><label>Unique Name</label><input type="text" id="name" name="name" onChange={handleNameChange} value={ingredient.name} disabled={edit}/></div>
      <div><label>Display Name</label><input type="text" id="display_name" name="display_name" onChange={handleDisplayNameChange} value={ingredient.display_name}/></div>
      <div>description</div>
      <div><textarea id="description" name="description" onChange={handleDescriptionChange} value={ingredient.description}/></div>
      <div><button type="submit">Submit</button></div>
    </form>
  )
}
