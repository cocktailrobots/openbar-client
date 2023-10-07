export function recipeIsValid(recipe) {
  if (recipe.display_name === "") {
    return [false, "Name is required"]
  }

  if (recipe.description === "") {
    return [false, "Description is required"]
  }

  if (recipe.directions === "") {
    return [false, "Directions are required"]
  }

  if (recipe.ingredients.length === 0) {
    return [false, "At least one ingredient is required"]
  }

  const uniqueIngNames = new Set()
  for (let i = 0; i < recipe.ingredients.length; i++) {
    if (uniqueIngNames.has(recipe.ingredients[i].name)) {
      return [false, "Ingredient " + (i + 1) + " '" + recipe.ingredients[i].name +"' is a duplicate"]
    }

    uniqueIngNames.add(recipe.ingredients[i].name)
    if (recipe.ingredients[i].name === "" || recipe.ingredients[i].name === "invalid") {
      return [false, "Ingredient " + (i + 1) + " is invalid"]
    }

    if (recipe.ingredients[i].amount <= 0) {
      return [false, "Ingredient " + (i + 1) + " amount " + recipe.ingredients[i].amount +" is invalid"]
    }
  }

  return [true, ""]
}