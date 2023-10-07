import React from 'react'

export default function CocktailForm({cocktail, setCocktail, onSubmit, edit}) {
  if (cocktail === null) {
    return null
  }

  function handleNameChange(evt) {
    // lowercase evt.target.value and remove any non-alphanumeric characters before calling setName
    const lwr = evt.target.value.toLowerCase()
    const formatted = lwr.replace(/[^a-z0-9]/g, '')
    setCocktail({...cocktail, name: formatted})
  }

  function handleDisplayNameChange(evt) {
    setCocktail({...cocktail, display_name: evt.target.value})
  }

  function handleDescriptionChange(evt) {
    setCocktail({...cocktail, description: evt.target.value})
  }

  return (
    <form onSubmit={onSubmit}>
      <div><label>Unique Name</label><input type="text" id="name" name="name" onChange={handleNameChange} value={cocktail.name} disabled={edit}/></div>
      <div><label>Display Name</label><input type="text" id="display_name" name="display_name" onChange={handleDisplayNameChange} value={cocktail.display_name}/></div>
      <div>description</div>
      <div><textarea id="description" name="description" onChange={handleDescriptionChange} value={cocktail.description}/></div>
      <div><button type="submit">Submit</button></div>
    </form>
  )
}
