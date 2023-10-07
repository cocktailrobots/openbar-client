import React, { useState } from 'react'
import RecipeForm from './RecipeForm'
import ErrorDisplay from '../components/ErrorDisplay'
import { recipeIsValid } from '../utils/validation'
import { postJsonToApi } from '../utils/api'
import { OpenBarConfig } from '../App'
import { useNavigate } from 'react-router-dom'

export default function NewRecipe() {
  const navigate = useNavigate()
  const [errMsg, setErrMsg] = useState(null)
  const [recipe, setRecipe] = useState({
    cocktail_id: "invalid",
    display_name: "",
    description: "",
    directions: "",
    ingredients: [
      {
        name: "invalid",
        amount: 1,
        amount_str: "1"
      }
    ]
  })

  function handleSubmit(evt) {
    setErrMsg(null)

    evt.preventDefault()
    console.log(recipe)
    const [valid, err] = recipeIsValid(recipe)
    if (!valid) {
      setErrMsg(err)
      return
    }

    postJsonToApi(OpenBarConfig.cocktails_api_host, "/recipes", [recipe]).then(
      () => navigate("/recipes")
    ).catch(err => setErrMsg(err))
  }

  return (
    <div>
      <RecipeForm recipe={recipe} setRecipe={setRecipe} onSubmit={handleSubmit}/>
      <ErrorDisplay err={errMsg}/>
    </div>
  )
}
