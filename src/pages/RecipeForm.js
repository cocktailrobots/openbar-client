import React, { useState } from 'react'
import useApiGet from '../hooks/useApiGet'
import { OpenBarConfig } from '../App'
import { postJsonToApi } from '../utils/api'

export default function RecipeForm({recipe, setRecipe, onSubmit}) {
  const [ingredients, ingErr] = useApiGet(OpenBarConfig.cocktails_api_host, "/ingredients", null, null)
  const [cocktails, cockErr] = useApiGet(OpenBarConfig.cocktails_api_host, "/cocktails", null, null)

  if (recipe === null || ingredients === null || cocktails === null) {
    return null
  }

  function handleIngredientChange(evt, idx) {
    const prevAmount = recipe.ingredients[idx].amount
    const prevAmountStr = recipe.ingredients[idx].amount_str
    const newIngredients = [...recipe.ingredients]
    newIngredients[idx] = {name: evt.target.value, amount: prevAmount, amount_str: prevAmountStr}
    setRecipe({ ...recipe, ingredients: newIngredients })
  }

  function filterValid(val) {
    const last = val[val.length - 1]
    const validChars = "0123456789."
    let valid = true
    if (last === '.') {
      let decimalCount = 0
      for (let i = 0; i < val.length; i++) {
        if (val[i] === '.') {
          decimalCount++
        }
      }
      valid = decimalCount <= 1
    } else {
      valid = validChars.includes(last)
    } 
    
    if (valid) {
      return val
    } else {
      return val.slice(0, val.length - 1)
    }
  }

  function handleAmountChange(evt, idx) {
    const prevIng = recipe.ingredients[idx]
    const amountStr = filterValid(evt.target.value)
    let amount = 0
    if (amountStr.length > 0) {
      amount = parseFloat(amountStr)
    }
    setRecipe({...recipe, ingredients: [...recipe.ingredients.slice(0, idx), {...prevIng, amount_str: amountStr, amount: amount}, ...recipe.ingredients.slice(idx + 1)]})
  }


  function handleAddIngredient() {
    setRecipe({
      ...recipe,
      ingredients: recipe.ingredients.concat([{name: "invalid", amount: 1, amount_str: "1"}])
    })
  }

  return (
    <div>
      <form onSubmit={evt => onSubmit(evt)}>
        <div>
          <label>Cocktail </label>
          <select id="cocktails" name="cocktails" onChange={evt => setRecipe({...recipe, cocktail_id:evt.target.value})} value={recipe.cocktail_id}>
            <option value="invalid"></option>
            {cocktails.map(cocktail => {
              return (
                <option key={cocktail.name} value={cocktail.name}>{cocktail.display_name}</option>
              )
            })}
          </select>
        </div>
        <div>
          <label>Name </label>
          <input type="text" id="name" name="name" onChange={evt => (setRecipe({...recipe, display_name: evt.target.value}))} value={recipe.display_name}/>
        </div>
        <div>
          <label>Description </label>
        </div>
        <div>
          <textarea id="description" name="description" onChange={evt => (setRecipe({...recipe, description: evt.target.value}))} value={recipe.description}/>
        </div>
        <div>
          <label>Directions </label>
        </div>
        <div>
          <textarea id="directions" name="directions" onChange={evt => (setRecipe({...recipe, directions: evt.target.value}))} value={recipe.directions}/>
        </div>
        <div>
          <div>
          <label>Ingredients</label>
          </div>
          <div>
            {recipe.ingredients.map((recipeIngredient, idx) => {
              return (
                <div key={"ingredient_" + idx}>
                  <select id="ingredients" name="ingredients" onChange={evt => handleIngredientChange(evt, idx)} value={recipe.ingredients[idx].name}>
                    <option value="invalid" ></option>
                    {ingredients.map(ingredient => {
                      return (
                        <option key={ingredient.name} value={ingredient.name}>{ingredient.display_name}</option>
                      )
                    })}
                  </select>
                  <label> Amount </label>
                  <input type="text" id="amount" name="amount" onChange={evt => handleAmountChange(evt, idx)} value={recipe.ingredients[idx].amount_str} />
                  <button type="button" onClick={() => handleAddIngredient()}>+</button>
                </div>
              )
            })}
          </div>
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  )
}
