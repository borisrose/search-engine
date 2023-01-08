import { createRecipeInterface, emptyRecipeInterface } from '../factory/recipeFactory.js'
import { createFilteredListInterface } from '../factory/elementFactory.js'
import { getAllRecipesWithCrossValues, search } from '../filters/recipesFilters.js'
import { removeMultipleSameElements } from '../filters/elementsFilters.js'




const searchTypes = [

    'Ingredients',
    'Appareils',
    'Ustensiles'

]

 

function countToThree (e,type) {  


    if(type) return search(e.target.value,type)
    if(e.target.value.length >= 3){
        let data = search(e.target.value,type)
        
        return data
    }    
        

    
}  



const handleElementsListAfterMainSearchResults = (foundRecipes) => {


    const $ingredientsInputDiv = document.querySelector('#ingredients');

    const $applianceInputDiv = document.querySelector('#appliance');

    const $ustensilsInputDiv = document.querySelector('#ustensils');


    const {ing, app, ust} = removeMultipleSameElements(foundRecipes)



    let $divs = [$ingredientsInputDiv,$applianceInputDiv,  $ustensilsInputDiv
    ]

    let lists = [ing, app, ust]

    for(let index in $divs){

        if($divs[index].firstChild.nextSibling){
            $divs[index].removeChild($divs[index].firstChild.nextSibling)

        }
        if(index === '0'){

            console.log('index 0')
            createFilteredListInterface($divs[index], lists[index], 'ingredients', foundRecipes)
        }
        if(index === '1'){
            console.log('index 1')
            createFilteredListInterface($divs[index], lists[index], 'appliance', foundRecipes)
        }
        if(index === '2'){
            console.log('index 2')
            createFilteredListInterface($divs[index], lists[index], 'ustensils', foundRecipes)
        }
        
    }


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