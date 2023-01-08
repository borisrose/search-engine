import { createRecipeInterface, emptyRecipeInterface } from '../factory/recipeFactory.js'
import { createFilteredListInterface } from '../factory/elementFactory.js'


import {
    recipes
} from '../../../recipes.js'


const searchTypes = [

    'Ingredients',
    'Appareils',
    'Ustensiles'

]




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





function search (e, type) {

    let searchData = []

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

    return(searchData)
}





function countToThree (e,type) {  


    if(type) return search(e.target.value,type)
    if(e.target.value.length >= 3){
        let data = search(e.target.value,type)
        
        return data
    }    
        

    
}  



const filterElementsByType = (foundRecipes) => {


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

    let filteredList = list

    for(let i = 0; i < list.length; i++){

        for(let k = 0; k < list.length; k++){

            if(list[i] == list[k]  && i !== k){

                filteredList.splice(k, 1)
              
            }

        }


    }

    return filteredList
}




const removeMultipleSameElements = (foundRecipes) => {

   
    const { ing, app, ust } = filterElementsByType(foundRecipes)

    let newIngredientsList = iterateOnListToFilter(ing)
    let newApplianceList = iterateOnListToFilter(app)
    let newUstensilsList = iterateOnListToFilter(ust)


    return { ing : newIngredientsList, app : newApplianceList, ust : newUstensilsList}



    
    
}



const handleElementsListAfterMainSearchResults = (foundRecipes) => {


    const $ingredientsInputDiv = document.querySelector('#ingredients');

    const $applianceInputDiv = document.querySelector('#appliance');

    const $ustensilsInputDiv = document.querySelector('#ustensils');


    const {ing, app, ust} = removeMultipleSameElements(foundRecipes)


    createFilteredListInterface($ingredientsInputDiv, ing)
    createFilteredListInterface($applianceInputDiv, app)
    createFilteredListInterface($ustensilsInputDiv, ust)

}

export const handleChange = () => {



    const $button = document.getElementById('search')

    $button.onchange = (e)=> {

        
        if(e.target.value.length >= 3){

            let data = countToThree(e) ? countToThree(e) : null; 
            if(data){
                console.log('data', data)
                if(data.length > 0){
                    console.log('creation')
                    createRecipeInterface(data)

                    //modify ingredients, appliance, ustensils
                    handleElementsListAfterMainSearchResults(data)



                }
                else {
    
                    console.log('deletion')
                    emptyRecipeInterface()
                }
                
               
            }


        }
        else {
            console.log('deletion')
            emptyRecipeInterface()
        }
       
       
    }
    
}




export const handleSearchEngineChange = (type) => {

    console.log('in HSEC')

    const $button = document.getElementById(type)

    $button.onchange = (e) => {

        
        if(e.target.value.length > 0){

            let data = countToThree(e,type) ? countToThree(e,type) : null; 
            if(data){
                console.log('data', data)
                if(data.length > 0){
                    console.log('creation')
                    /*createRecipeInterface(data)*/

                    handleCrossSearchEngineChange()
                }
                else {
    
                    console.log('deletion')
                    handleCrossSearchEngineChange()
                }
                
                
            }
            else {
    
                console.log('rien ne correspond dans la base de données')
                handleCrossSearchEngineChange()
            }

        }
     
       

    }

}



const filterRecipes = (dataObjectsArray) => {

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



const getAllRecipesWithCrossValues = (crossValues) => {

    let dataObjectsArray = []
    let selectedRecipes = []

    for(let obj of crossValues){

       dataObjectsArray.push(search(obj.value, obj.type))
        
    }

    console.log('dataObjectsArray', dataObjectsArray)
    
    return filterRecipes(dataObjectsArray)

}

export const handleCrossSearchEngineChange = () => {

    let crossValues = []


    for(let type of searchTypes){

        const $button = document.getElementById(type)
   

        if($button.value){

            let searchObject = {
                type, 
                value: $button.value
            }

            console.log('searchObject ===>', searchObject)

            crossValues.push(searchObject)
        }

           
        
    }

    createRecipeInterface(getAllRecipesWithCrossValues(crossValues))


    




}