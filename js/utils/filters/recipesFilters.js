
import {
    recipes
} from '../../../recipes.js'



 


export const filterRecipesViaKeyWord = (recipes, type, el) => {

   

    let filteredRecipes = [] 
    

    recipes.forEach(recipe => {

        if(type === 'ingredients'){

            recipe.ingredients.forEach((ingredient) => {

                if(ingredient.ingredient === el) {
                    filteredRecipes.push(recipe)
                }
            })


        }
        if(type === 'appliance'){
            
            if(recipe.appliance === el){
                filteredRecipes.push(recipe)
            }
            
        }
        if(type === 'ustensils'){
            
            recipe.ustensils.forEach((ustensil) => {
                
                if(ustensil === el){
                    filteredRecipes.push(recipe)
                }

            })
                
            
        }
    })
    
        
 
    return filteredRecipes

}

export const filterRecipes = (dataObjectsArray) => {




    if(dataObjectsArray.length === 1){
        return dataObjectsArray[0]
    }


    if(dataObjectsArray.length === 2){

        let inBothArrays = []

        dataObjectsArray[0].forEach((obj) => {

            dataObjectsArray[1].forEach(comparingObject => {

                if(obj === comparingObject){
                    inBothArrays.push(obj)
                }
            })
        })


        return inBothArrays
    }

    if(dataObjectsArray.length === 3){

        let inThreeArrays= []
        let inBothArrays = []

        dataObjectsArray[0].forEach((obj) => {


            dataObjectsArray[1].forEach((obj) => {


                if(obj === comparingObject){
                    inBothArrays.push(obj)
                }

            })
        })

        for(let obj of inBothArrays ){


            dataObjectsArray[2].forEach(comparingObject => {

                if(obj === comparingObject){
                    inThreeArrays.push(obj)
                }

            })
        }


        return inThreeArrays

    }



}


export const getAllRecipesWithCrossValues = (crossValues, specificRecipes) => {


   




        let dataObjectsArray = []
    
    
            crossValues.forEach(obj => {
        
                    if(specificRecipes){
                        dataObjectsArray.push(search(obj.value, obj.type, specificRecipes))
                    }
                    else {
                        dataObjectsArray.push(search(obj.value, obj.type))
                    }
            })
            
        
    
        
        return filterRecipes(dataObjectsArray)


    
   

}


function searchIngredients(recipe, e) {

    recipe.ingredients.forEach((ingredient) => {

        if(ingredient.ingredient.includes(e)){
            return true 
        }

    })

}

function searchUstensils(recipe, e){

    recipe.ustensils.forEach(ust => {

        if(ust.includes(e)) return true
    })

}





export function search (e, type, selectedRecipes) {

    let searchData = []

    if(selectedRecipes){


        selectedRecipes.forEach((recipe) => {
    
            if(type){
    
                if(type === 'Ingredients'){
                    if (searchIngredients(recipe, e)) searchData.push(recipe)
                }
    
                if(type === 'Ustensiles'){
                    if(searchUstensils(recipe, e)) searchData.push(recipe)
                }
    
                if(type === 'Appareils'){
                    if (recipe.appliance.includes(e)) searchData.push(recipe)
                }
            }
            else {
    
                if(recipe.name.includes(e) || recipe.description.includes(e) || searchIngredients(recipe, e)){
    
                    searchData.push(recipe)
        
                }
    
            }
    
        })


    }
    else {

        

        recipes.forEach(recipe => {
    
            if(type){
    
                if(type === 'Ingredients'){
                    if (searchIngredients(recipe, e)) searchData.push(recipe)
                }
    
                if(type === 'Ustensiles'){
                    if(searchUstensils(recipe, e)) searchData.push(recipe)
                }
    
                if(type === 'Appareils'){
                    if (recipe.appliance.includes(e)) searchData.push(recipe)
                }
            }
            else {
    
                if(recipe.name.includes(e) || recipe.description.includes(e) || searchIngredients(recipe, e)){
    
                    searchData.push(recipe)
        
                }
    
            }
    
        })



    }

   

    return(searchData)
}


