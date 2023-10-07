import React, { useState } from 'react'
import useApiGet from '../hooks/useApiGet'
import { OpenBarConfig } from '../App'
import { useNavigate, useParams } from 'react-router-dom'
import ErrorDisplay from '../components/ErrorDisplay'
import CocktailForm from './CocktailForm'
import { patchJsonToApi } from '../utils/api'

export default function EditCocktail() {
  const {id} = useParams()
  const navigate = useNavigate()
  const [err, setErr] = useState(null)
  const [cocktail, cockErr,, setCocktail] = useApiGet(OpenBarConfig.cocktails_api_host, "/cocktails/" + id, null, null)

  function handleSubmit(evt) {
    setErr(null)
    
    evt.preventDefault()
    console.log(cocktail)

    patchJsonToApi(OpenBarConfig.cocktails_api_host, "/cocktails/" + id, [cocktail]).then(
      () => navigate("/cocktails")
    ).catch(err => setErr(err))
  }

  return (
    <div>
      <CocktailForm cocktail={cocktail} setCocktail={setCocktail} onSubmit={handleSubmit} edit={true}/>
      <ErrorDisplay err={err}/>
    </div>
  )
}
