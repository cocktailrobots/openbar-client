import React, { useEffect, useState } from 'react'
import useApiGet from '../hooks/useApiGet'
import { OpenBarConfig } from '../App'
import { getFromApi } from '../utils/api'

export default function MenuForm({menu, setMenu, fluidsParam, onSubmit}) {
  console.log("fluidsParam", fluidsParam)

  const [ingredients, ingErr] = useApiGet(OpenBarConfig.cocktails_api_host, "/ingredients", null, null)
  const [recipes, setRecipes] = useState([])

  useEffect(() => {
    const getData = async () => {
      const response = await getFromApi(OpenBarConfig.cocktails_api_host, "/recipes", {fluids:fluidsParam})
      const newRecipes = await response.json()
      console.log(newRecipes)
      setRecipes(newRecipes)

      for (let i = 0; i < menu.items.length; i++) {
        if (!newRecipes.map(recipe => recipe.id).includes(menu.items[i])) {
          const newItems = [...menu.items]
          newItems.splice(i, 1)
          setMenu({...menu, items: newItems})
        }
      }
    }

    getData().catch(err => {
      console.error(err)
    })
    console.log("useEffect")
  }, [fluidsParam, menu])

  if (ingredients === null) {
    return null
  }

  function handleAddIngredient() {
    setMenu({
      ...menu,
      ingredients: menu.ingredients.concat("invalid")
    })
  }

  function handleDeleteIngredient(idx) {
    const newIngredients = [...menu.ingredients]
    newIngredients.splice(idx, 1)
    setMenu({...menu, ingredients: newIngredients})
  }


  function handleIngredientChange(evt, idx) {
    console.log("changing ingredient")
    const newIngredients = [...menu.ingredients]
    newIngredients[idx] = evt.target.value
    setMenu({ ...menu, ingredients: newIngredients })
  }

  function handleCheckChanged(evt, idx) {
    console.log("changing check")
    const newItems = [...menu.items]
  
    if (evt.target.checked) {
      newItems.push(recipes[idx].id)
    } else {
      newItems.splice(newItems.indexOf(recipes[idx].id), 1)
    }

    setMenu({...menu, items: newItems})
  }

  function isChecked(recipeId) {
    return menu.items.includes(recipeId)
  }

  console.log("menu", menu)
  return (
    <form onSubmit={onSubmit}>
      <div>
        <label>Name</label>
        <input type="text" value={menu.name} onChange={evt => setMenu({...menu, name: evt.target.value})}/>
      </div>
      <div>
        {menu.ingredients.map((menuIngredient, idx) => {
          return (
            <div key={"ingredient_" + idx}>
              {idx}
              <select id="ingredients" name="ingredients" onChange={evt => handleIngredientChange(evt, idx)} value={menuIngredient}>
                <option value="invalid" ></option>
                {ingredients.map(ingredient => {
                  return (
                    <option key={ingredient.name} value={ingredient.name}>{ingredient.display_name}</option>
                  )
                })}
              </select>
              <button type="button" onClick={() => handleAddIngredient()}>+</button>
              <button type="button" onClick={() => handleDeleteIngredient(idx)}>-</button>
            </div>
          )
        })}
      </div>
      <div>
        <div>Possible Recipes</div>
        <div>
          <ul>
            {recipes.map((recipe, idx) => {
              return (
                <li key={recipe.id}>
                  <div><input type="checkbox" checked={isChecked(recipe.id)} onChange={evt => handleCheckChanged(evt, idx)}/>{recipe.display_name}</div>
                  <div>{recipe.description}</div>
                  <div>{recipe.directions}</div>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
      <div>
        <button type="submit">Submit</button>
      </div>
    </form>
  )
}
