import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import IngredientForm from './IngredientForm'
import ErrorDisplay from '../components/ErrorDisplay'
import { postJsonToApi } from '../utils/api'
import { OpenBarConfig } from '../App'

export default function NewIngredient() {
  const navigate = useNavigate()
  const [err, setErr] = useState(null)
  const [ingredient, setIngredient] = useState({name: "", display_name: "", description: ""})

  function handleSubmit(evt) {
    setErr(null)

    evt.preventDefault()
    console.log(ingredient)

    postJsonToApi(OpenBarConfig.cocktails_api_host, "/ingredients", [ingredient]).then(
      () => navigate("/ingredients")
    ).catch(err => setErr(err))
  }

  return (
    <div>
      <IngredientForm ingredient={ingredient} setIngredient={setIngredient} onSubmit={handleSubmit}/>
      <ErrorDisplay err={err}/>
    </div>
  )
}
