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

    if(foundRecipes.length > 0){

        
        console.log('recettes trouvées')
        

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


        return { ing, app, ust}

    }
    else {

        console.log('rien dans le tableau de recettes interface')

        $applianceInputDiv.firstChild.nextSibling.innerHTML = ""
        $ingredientsInputDiv.firstChild.nextSibling.innerHTML = ""
        $ustensilsInputDiv.firstChild.nextSibling.innerHTML = ""

        
        $applianceInputDiv.firstChild.firstChild.setAttribute('placeholder', 'Appareils')
        $ingredientsInputDiv.firstChild.firstChild.setAttribute('placeholder', 'Ingrédients')
        $ustensilsInputDiv.firstChild.firstChild.setAttribute('placeholder', 'Ustensiles')
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


    const $button = document.getElementById(type)

    $button.onchange = (e) => {

        
        if(e.target.value.length > 0){

            let data = countToThree(e,type) ? countToThree(e,type) : null; 
            if(data){
                
                if(data.length > 0){
    

                    handleCrossSearchEngineChange()
                    const {app, ing, ust} = handleElementsListAfterMainSearchResults(data)

                    
                    const $ingredientsInputDiv = document.querySelector('#ingredients');

                    const $applianceInputDiv = document.querySelector('#appliance');
                
                    const $ustensilsInputDiv = document.querySelector('#ustensils');
                    $ingredientsInputDiv.firstChild.nextSibling.remove()
                    let arrayI = []
                    for( let i of ing){
                  
                        if(i.includes(e.target.value)){
                        
                            arrayI.push(i)
                            console.log('enter before create filtered',  i )        

                        } 
                        console.log(arrayI , ' array i ')
            
                    }
                    createFilteredListInterface($ingredientsInputDiv, arrayI, 'ingredients', data)


                }
                else {
    
                    handleCrossSearchEngineChange()
                }
                
                
            }
            else {
    
                handleCrossSearchEngineChange()
                emptyRecipeInterface()
            }

        }
        else {
            handleElementsListAfterMainSearchResults("")
            emptyRecipeInterface()
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