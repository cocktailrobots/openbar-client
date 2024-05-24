import { Routes, Route } from 'react-router-dom';
import './css/App.css';
import OpenBarMainMenu from './pages/OpenbarMainMenu';
import AdminMenu from './pages/AdminMenu';
import ButtonsMenu from './pages/ButtonsMenu';
import CocktailsMenu from './pages/CocktailsMenu';
import CocktailEdit from './pages/CocktailEdit';
import CocktailNew from './pages/CocktailNew';
import IngredientsMenu from './pages/IngredientsMenu';
import IngredientEdit from './pages/IngredientEdit';
import IngredientNew from './pages/IngredientNew';
import MenusMenu from './pages/MenusMenu';
import MenuEdit from './pages/MenuEdit';
import MenuNew from './pages/MenuNew';
import RecipesMenu from './pages/RecipesMenu';
import RecipeEdit from './pages/RecipeEdit';
import RecipeNew from './pages/RecipeNew';
import FluidsMenu from './pages/FluidsMenu';
import ReactModal from 'react-modal';
import ConfigMenu from './pages/ConfigMenu';

function envVar(key, defaultValue) {
  if (process.env.NODE_ENV === 'development') {
    key = key + "_DEV"
  } else if (process.env.NODE_ENV === 'production') {
    key = key + "_PROD"
  } 

  const val = process.env[key] || defaultValue
  console.log("envVar: " + key + " = " + val, process.env)

  return val
}

export const OpenBarConfig = {
  "openbar_api_host": envVar("REACT_APP_OPENBAR_API_HOST", "localhost:3099"),
  "cocktails_api_host": envVar("REACT_APP_COCKTAILS_API_HOST", "localhost:8675")
}

ReactModal.setAppElement('#root');

function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<OpenBarMainMenu />} />
      <Route path="/admin" element={<AdminMenu/>} />
      <Route path="/buttons" element={<ButtonsMenu/>} />
      <Route path="/cocktails" element={<CocktailsMenu />} />
      <Route path="/cocktails/new" element={<CocktailNew />} />
      <Route path="/cocktails/:id" element={<CocktailEdit />} />
      <Route path="/fluids" element={<FluidsMenu />} />
      <Route path="/ingredients" element={<IngredientsMenu />} />
      <Route path="/ingredients/new" element={<IngredientNew />} />
      <Route path="/ingredients/:id" element={<IngredientEdit />} />
      <Route path="/menus" element={<MenusMenu />} />
      <Route path="/menus/new" element={<MenuNew />} />
      <Route path="/menus/:id" element={<MenuEdit />} />
      <Route path="/recipes" element={<RecipesMenu />} />
      <Route path="/recipes/new" element={<RecipeNew />} />
      <Route path="/recipes/:id" element={<RecipeEdit />} />
      <Route path='/config' element={<ConfigMenu />} />
    </Routes>
    </>
  )
}

export default App;
