import React, { useState } from 'react'
import useApiGet from '../hooks/useApiGet'
import { OpenBarConfig } from '../App'
import { useNavigate, useParams } from 'react-router-dom'
import ErrorDisplay from '../components/ErrorDisplay'
import IngredientForm from './IngredientForm'
import { patchJsonToApi } from '../utils/api'

export default function EditIngredient() {
  const {id} = useParams()
  const navigate = useNavigate()
  const [err, setErr] = useState(null)
  const [ingredient, ingErr,, setIngredient] = useApiGet(OpenBarConfig.cocktails_api_host, "/ingredients/" + id, null, null)

  function handleSubmit(evt) {
    setErr(null)

    evt.preventDefault()
    console.log(ingredient)

    patchJsonToApi(OpenBarConfig.cocktails_api_host, "/ingredients/" + id, ingredient).then(
      () => navigate("/ingredients")
    ).catch(err => {
      setErr(err)
    })
  }

  return (
    <div>
      <IngredientForm ingredient={ingredient} setIngredient={setIngredient} onSubmit={handleSubmit} edit={true}/>
      <ErrorDisplay err={err}/>
    </div>
  )
}
