import React, { useState } from 'react'
import useApiGet from '../hooks/useApiGet'
import { OpenBarConfig } from '../App'
import { useNavigate, useParams } from 'react-router-dom'
import RecipeForm from './RecipeForm'
import ErrorDisplay from '../components/ErrorDisplay'
import { recipeIsValid } from '../utils/validation'
import { patchJsonToApi } from '../utils/api'

export default function EditRecipe() {
  const {id} = useParams()
  const navigate = useNavigate()
  const [errMsg, setErrMsg] = useState(null)
  const [recipe, getErr,, setRecipe] = useApiGet(OpenBarConfig.cocktails_api_host, "/recipes/" + id, null, null)

  if (recipe !== null) {
    console.log("recipe: ", recipe)

    let missingAmtStrs = 0
    let updatedIngredients = []
    for (let i = 0; i < recipe.ingredients.length; i++) {
      if (!recipe.ingredients[i].amount_str) {
        missingAmtStrs++
        const amtStr = "" + recipe.ingredients[i].amount
        console.log("amount:", recipe.ingredients[i].amount, "amtStr: ", amtStr)
        updatedIngredients.push({...recipe.ingredients[i], amount_str: amtStr})
      } else {
        updatedIngredients.push(recipe.ingredients[i])
      }
    }

    if (missingAmtStrs > 0) {
      setRecipe({...recipe, ingredients: updatedIngredients})
    }
  }

  function handleSubmit(evt) {
    setErrMsg(null)

    evt.preventDefault()
    console.log(recipe)
    const [valid, err] = recipeIsValid(recipe)
    if (!valid) {
      setErrMsg(err)
      return
    }

    patchJsonToApi(OpenBarConfig.cocktails_api_host, "/recipes/" + id, [recipe]).then(
      () => navigate("/recipes")
    ).catch(err => setErrMsg(err))
  }

  return (
    <div>
      <RecipeForm recipe={recipe} onSubmit={handleSubmit} setRecipe={setRecipe}/>
      <ErrorDisplay err={errMsg}/>
    </div>
  )
}
