
export const filterElementsByType = (foundRecipes) => {


    let ingredientsList = []
    let applianceList = []
    let ustensilsList = []

    for(let recipe of foundRecipes){


        for(let ingredient of recipe.ingredients){

            ingredientsList.push(ingredient.ingredient)

        }

        applianceList.push(recipe.appliance)

        for(let ustensil of recipe.ustensils){

            ustensilsList.push(ustensil)
        }


    }

    return { ing : ingredientsList, app: applianceList, ust : ustensilsList}
}


const iterateOnListToFilter = (list) => {
    let listToFilter = list;
    let copyLenght = listToFilter.length;
  
    for(let i = 0; i < copyLenght; i++) {
      for(let k = i + 1; k < copyLenght; k++) {
        if(listToFilter[k] && listToFilter[i] && listToFilter[i] === listToFilter[k]) {
          listToFilter.splice(k, 1);
          k--;
          copyLenght--;
        } 
      }
    }
  
    return listToFilter;
  }




export const removeMultipleSameElements = (foundRecipes) => {


   
    const { ing, app, ust } = filterElementsByType(foundRecipes)

    let newIngredientsList = iterateOnListToFilter(ing)
    let newApplianceList = iterateOnListToFilter(app)
    let newUstensilsList = iterateOnListToFilter(ust)


    return { ing : newIngredientsList, app : newApplianceList, ust : newUstensilsList}



    
    
}

