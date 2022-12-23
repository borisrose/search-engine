import { createRecipeInterface } from '../factory/recipeFactory.js'


import {
    recipes
} from '../../../recipes.js'


let counter = 3


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
    if(counter >= 3){
        let data = search(e.target.value,type)
        
        return data
    }    
        

    
}  



export const handleChange = () => {

    console.log('in HC')

    const $button = document.getElementById('search')

    $button.onchange = (e)=> {


        let data = countToThree(e) ? countToThree(e) : null; 
        if(data ){
            console.log('data', data)
            if(data.length > 0){
                createRecipeInterface(data)
            }
            
           
        }
       
    }
    
}

export const handleSearchEngineChange = (type) => {

    console.log('in HSEC')

    const $button = document.getElementById(type)

    $button.onchange = (e) => {
        
        let data = countToThree(e,type) ? countToThree(e,type) : null; 
        if(data ){
            console.log('data', data)
            if(data.length > 0){
                createRecipeInterface(data)
            }
            
           
        }

    }

}