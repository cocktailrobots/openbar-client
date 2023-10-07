import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CocktailForm from './CocktailForm'
import ErrorDisplay from '../components/ErrorDisplay'
import { postJsonToApi } from '../utils/api'
import { OpenBarConfig } from '../App'

export default function NewCocktail() {
  const navigate = useNavigate()
  const [err, setErr] = useState(null)
  const [cocktail, setCocktail] = useState({name: "", display_name: "", description: ""})

  function handleSubmit(evt) {
    setErr(null)

    evt.preventDefault()
    console.log(cocktail)

    postJsonToApi(OpenBarConfig.cocktails_api_host, "/cocktails", [cocktail]).then(
      () => navigate("/cocktails")
    ).catch(err => setErr(err))
  }

  return (
    <div>
      <CocktailForm cocktail={cocktail} setCocktail={setCocktail} onSubmit={handleSubmit}/>
      <ErrorDisplay err={err}/>
    </div>
  )
}
