import React from 'react'
import Modal from 'react-modal'

export default function MakeDrinkModal({recipe, isMaking, ingredientStr, makeDrink, handleModalClose, customizeRecipe}) {
  console.log("recipe:", recipe)
  const validNonCustom = recipe !== null && recipe !== undefined && recipe.id !== -1

  if (!validNonCustom) {
    return null
  }

  return (
    <Modal style={{
      overlay: {
        backgroundColor: 'black',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: '50px',
      },
      content: {
        backgroundColor: '#082640',
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
      }
    }} isOpen={validNonCustom} onRequestClose={handleModalClose}>
{
  <div>
    <h3 className='menu-modal-cocktailname'>{recipe.display_name}</h3>
    <div className='menu-modal-ingredients'>{ingredientStr}</div>
    <div className='menu-modal-directions'>{recipe.directions}</div>
    <div className='menu-modal-buttons-div'>
      <button className='btn btn-padded-right' onClick={() => makeDrink(recipe.ingredients)} disabled={isMaking}>Make Drink</button>
      <button className='btn btn-add btn-padded-right' onClick={() => customizeRecipe(recipe)} disabled={isMaking}>Customize Drink</button>
      <button className='btn btn-cancel' onClick={handleModalClose} disabled={isMaking}>Close</button>
    </div>
  </div>
}
</Modal>
  )
}
