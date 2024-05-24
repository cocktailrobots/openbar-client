import React, {useEffect, useState} from 'react'
import { OpenBarConfig } from '../App'
import { apiGetMany, getFromApi, postJsonToApi } from '../utils/api'
import ErrorDisplay from '../components/ErrorDisplay'
import { Link } from 'react-router-dom'
import MakeDrinkModal from './MakeDrinkModal'
import CustomDrinkModal from './CustomDrinkModal'

export default function OpenBarMainMenu() {
  const [errMsg, setErrMsg] = useState(null)
  const [recipes, setRecipes] = useState(null)
  const [fluids, setFluids] = useState(null)
  const [ingredients, setIngredients] = useState(null)
  const [selectedRecipe, setSelectedRecipe] = useState(null)
  const [recipeToCustomize, setRecipeToCustomize] = useState(null)
  const [defaultVolMl, setDefaultVolMl] = useState(135)
  const [isMaking, setIsMaking] = useState(false)

  async function getRecipes(config, fluids) {
    const params = fluids.map(fluid => fluid.id).join(",")
    const recipesResp = await getFromApi(OpenBarConfig.cocktails_api_host, "/recipes", {fluids:params})
    const recipesForIng = await recipesResp.json()

    console.log("recipesForIng:", recipesForIng)
    if ( !("current_menu" in config) || config.current_menu === "") {
      console.log("no menu set")
      return recipesForIng
    }

    const menuName = config.current_menu
    const menuResp = await getFromApi(OpenBarConfig.openbar_api_host, `/menus/${menuName}/recipes`, null)
    const menu = await menuResp.json()

    console.log("menu:", menu)
    return recipesForIng.filter(recipe => menu.includes(recipe.id))
  }

  useEffect(() => {
    const toGet = [
      {name:"ingredients", host:OpenBarConfig.cocktails_api_host, path:"/ingredients", params:null},
      {name:"fluids", host:OpenBarConfig.openbar_api_host, path:"/fluids", params:null},
      {name:"config", host:OpenBarConfig.openbar_api_host, path:"/config", params:null},
    ]
    apiGetMany(toGet).then(results => {
      setFluids(results.fluids)
      getRecipes(results.config, results.fluids).then(recipes => {
        console.log("recipes:", recipes)
        recipes.push({
          id: -1,
          display_name: "Custom",
          description: "Create your own custom cocktail from the available ingredients.",
          ingredients: [],
          directions: ""
        })
        setRecipes(recipes)
        setIngredients(results.ingredients)
        
        if ("default_volume_ml" in results.config) {
          console.log("default_volume_ml:", results.config.default_volume_ml)
          try {
            const val = parseInt(results.config.default_volume_ml)
            setDefaultVolMl(val)
          } catch (err) {
            console.error(err)
          }
        }
      }).catch(err => setErrMsg(err.message))
    }).catch(err => setErrMsg(err.message))
  }, [])

  if (recipes === null) {
    return (
      <ErrorDisplay err={errMsg}/>
    )
  }

  function makeDrink(ingredients, volumeMl) {
    console.log("making drink", volumeMl)

    let totalWeight = 0
    for (let i = 0; i < ingredients.length; i++) {
      totalWeight += ingredients[i].amount
    }
    console.log("totalWeight:", totalWeight)
    
    const percentages = []
    for (let i = 0; i < ingredients.length; i++) {
      percentages.push(ingredients[i].amount/totalWeight)
    }

    console.log("percentages:", percentages)

    const makeRequest = {
      fluid_volumes: []
    }

    for (let i = 0; i < percentages.length; i++) {
      makeRequest.fluid_volumes.push({
        fluid: ingredients[i].name,
        volume_ml: Math.floor(percentages[i] * volumeMl)
      })
    }
    
    console.log("make", makeRequest)

    setIsMaking(false)
    postJsonToApi(OpenBarConfig.openbar_api_host, "/make", makeRequest).then(res => {
      console.log(res)
    }).catch(err => {
      setErrMsg(err.message)
    }).finally(() => {
      setIsMaking(false)
      setSelectedRecipe(null)
    })
  }

  function customizeRecipe(recipe) {
    setSelectedRecipe(null)
    setRecipeToCustomize(recipe)
  }

  function recipeIngredientStr(recipe) {
    if (recipe === null) {
      return ""
    }

    return recipe.ingredients.map(ing => {
      const ingredient = ingredients.filter(i => i.name === ing.name)[0]
      return ingredient.display_name
    }).join(" • ")
  }

  return (
    <>
    <div className='menu-container-div'>
      <MakeDrinkModal recipe={selectedRecipe} isMaking={isMaking} ingredientStr={recipeIngredientStr(selectedRecipe)} handleModalClose={() => setSelectedRecipe(null)} makeDrink={ingredients => makeDrink(ingredients, defaultVolMl)} customizeRecipe={customizeRecipe}/>
      <CustomDrinkModal recipe={recipeToCustomize} fluids={fluids} volMl={defaultVolMl} handleModalClose={() => setRecipeToCustomize(null)} makeDrink={makeDrink} isMaking={isMaking} />
      <div><h1>Cocktails</h1></div>
      <hr/>
      <ul className="menu-ul">
      {recipes.map(recipe => {
        return (
            <li className="menu-li" key={recipe.id} onClick={
              () => {
                if (recipe.id === -1) {
                  setRecipeToCustomize(recipe)
                } else {
                  setSelectedRecipe(recipe)
                }
              }
            }>
              <div>
                <h3>{recipe.display_name}</h3>
              </div>
              <div>
                <p>{recipe.description}</p>
              </div>
              <div>
                <p>{recipeIngredientStr(recipe)}</p>
              </div>
            </li>
        )
      })}
      </ul>
    </div>
    <div className='menu-admin-link-div'>
      <div ><Link to="/admin">•</Link></div>
    </div>
    </>
  )
}
