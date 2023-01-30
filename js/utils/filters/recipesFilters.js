
import {
    recipes
} from '../../../recipes.js'



 


export const filterRecipesViaKeyWord = (recipes, type, el) => {

   

    let filteredRecipes = [] 
    

    for(let recipe of recipes){

        if(type === 'ingredients'){

            for(let ingredient of recipe.ingredients){

                if(ingredient.ingredient === el) {
                    filteredRecipes.push(recipe)
                }
            }
        }
        if(type === 'appliance'){
            
            if(recipe.appliance === el){
                filteredRecipes.push(recipe)
            }
            
        }
        if(type === 'ustensils'){
            
            for(let ustensil of recipe.ustensils){
                
                if(ustensil === el){
                    filteredRecipes.push(recipe)
                }

            }
                
            
        }
    }
    
        
 
    return filteredRecipes

}

export const filterRecipes = (dataObjectsArray) => {




    if(dataObjectsArray.length === 1){
        return dataObjectsArray[0]
    }


    if(dataObjectsArray.length === 2){

        let inBothArrays = []

        for(let obj of dataObjectsArray[0]){

            for(let comparingObject of dataObjectsArray[1]){

                if(obj === comparingObject){
                    inBothArrays.push(obj)
                }
            }
        }


        return inBothArrays
    }

    if(dataObjectsArray.length === 3){

        let inThreeArrays= []
        let inBothArrays = []

        for(let obj of dataObjectsArray[0]){


            for(let comparingObject of dataObjectsArray[1]){


                if(obj === comparingObject){
                    inBothArrays.push(obj)
                }

            }
        }

        for(let obj of inBothArrays ){


            for(let comparingObject of dataObjectsArray[2]){

                if(obj === comparingObject){
                    inThreeArrays.push(obj)
                }

            }
        }


        return inThreeArrays

    }



}


export const getAllRecipesWithCrossValues = (crossValues, specificRecipes) => {


   




        let dataObjectsArray = []
    
    
            for(let obj of crossValues){
        
                    if(specificRecipes){
                        dataObjectsArray.push(search(obj.value, obj.type, specificRecipes))
                    }
                    else {
                        dataObjectsArray.push(search(obj.value, obj.type))
                    }
            }
            
        
    
        
        return filterRecipes(dataObjectsArray)


    
   

}


function searchIngredients(recipe, e) {

    for(let ingredient of recipe.ingredients) {

        if(ingredient.ingredient.includes(e)){
            return true 
        }

    }

}

function searchUstensils(recipe, e){

    for(let ust of recipe.ustensils){

        if(ust.includes(e)) return true
    }

}





export function search (e, type, selectedRecipes) {

    let searchData = []

    if(selectedRecipes){


        for(let recipe of selectedRecipes){
    
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
    
        }


    }
    else {

        

        for(let recipe of recipes){
    
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
    
        }



    }

   

    return(searchData)
}


