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



function search (e) {

    let searchData = []

    for(let recipe of recipes){

        if(recipe.name.includes(e) || recipe.description.includes(e) || searchIngredients(recipe, e)){

            searchData.push(recipe)

        }


       




    }


    return(searchData)
}





function countToThree (e) {

 
 
    if(counter >= 3){
      let data = search(e.target.value)
    
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