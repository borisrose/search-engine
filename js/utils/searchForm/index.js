import { createRecipeInterface, emptyRecipeInterface } from '../factory/recipeFactory.js'
import { createFilteredListInterface } from '../factory/elementFactory.js'
import { getAllRecipesWithCrossValues, search } from '../filters/recipesFilters.js'
import { removeMultipleSameElements } from '../filters/elementsFilters.js'
import { createSearchEngineInterface } from '../factory/searchEngineFactory.js'
import { classRemoverOrAdder } from '../classHandler.js'




const searchTypes = [

    'Ingredients',
    'Appareils',
    'Ustensiles'

]

 

function countToThree (e,type, selectedRecipes) {  


    if(type) return search(e.target.value,type, selectedRecipes)
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

        

        if($applianceInputDiv.firstChild.nextSibling && $ingredientsInputDiv.firstChild.nextSibling && $ustensilsInputDiv.firstChild.nextSibling){

            $applianceInputDiv.firstChild.nextSibling.innerHTML = ""
            $ingredientsInputDiv.firstChild.nextSibling.innerHTML = ""
            $ustensilsInputDiv.firstChild.nextSibling.innerHTML = ""

            $applianceInputDiv.firstChild.firstChild.setAttribute('placeholder', 'Appareils')
            $ingredientsInputDiv.firstChild.firstChild.setAttribute('placeholder', 'Ingrédients')
            $ustensilsInputDiv.firstChild.firstChild.setAttribute('placeholder', 'Ustensiles')

           ;

           let divArray = [$applianceInputDiv, $ingredientsInputDiv, $ustensilsInputDiv]

           for(let el of divArray){

                if(classRemoverOrAdder(Array.from(el.classList), 2, "strech-grid-like-10-21", true)){
                    el.classList.remove("strech-grid-like-10-21")
                }
                if(classRemoverOrAdder(Array.from(el.classList), 2, "strech-grid-like-20-31", true)){
                    el.classList.remove("strech-grid-like-20-31")
                }


           }


          
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
   
              
                    //handling-secondarySearchEngines-after-main-fired
                    createSearchEngineInterface(data)
                     //modify ingredients, appliance, ustensils
                     handleElementsListAfterMainSearchResults(data)

                }
                else {
    
                    console.log('deletion')
                    emptyRecipeInterface()
                    handleElementsListAfterMainSearchResults("")

                    const recipeDiv = document.querySelector("#recipes-div");

                   
                    const message = () => {
                        
                            return(
            
                            
                                "<p style='font-size: '>" 
                                + 
                                "Aucune recette ne correspond à votre critère… vous pouvez chercher « tarte aux pommes, « poisson »" 
                                + 
                                "</p>"
            
                            )
                    }
        
                    
                    recipeDiv.innerHTML = message()
        
                }
                
               
            }


        }
        else {
            console.log('deletion')
            emptyRecipeInterface()
            handleElementsListAfterMainSearchResults("")
            //handling-secondarySearchEngines-after-main-fired
            createSearchEngineInterface()
       

            


        }
       
       
    }
    
}




export const handleSearchEngineChange = (type, data) => {


    if(data){

        console.log('main fired');

        const $button = document.getElementById(type)

        $button.onchange = (e) => {

            if(e.target.value.length > 0){


                let dataWith = countToThree(e,type, data) ? countToThree(e,type, data) : null; 


                if(dataWith){
                    
                    if(data.length > 0){
        

                        handleCrossSearchEngineChange()
                        const {app, ing, ust} = handleElementsListAfterMainSearchResults(data)

                        
                        const $ingredientsInputDiv = document.querySelector('#ingredients');

                        const $applianceInputDiv = document.querySelector('#appliance');
                    
                        const $ustensilsInputDiv = document.querySelector('#ustensils');
                        
                        $ingredientsInputDiv.firstChild.nextSibling.remove()
                        $applianceInputDiv.firstChild.nextSibling.remove()
                        $ustensilsInputDiv.firstChild.nextSibling.remove()

                        const filterElementsListViaInput = (elementsArray) => {

                            let newFilteredList =  []
                            for( let el of elementsArray){
                    
                                if(el.includes(e.target.value)){
                                
                                    newFilteredList.push(el)
                                       
    
                                } 
                           
                    
                            }

                            return newFilteredList

                        }

                        if(type === "ingredients") {
                            createFilteredListInterface($ingredientsInputDiv, filterElementsListViaInput(ing), 'ingredients', data)
                        }
                        else {
                            createFilteredListInterface($ingredientsInputDiv, ing, 'ingredients', data)
                        }

                        if(type === 'appliance'){
                            createFilteredListInterface($applianceInputDiv, filterElementsListViaInput(app), 'appliance', data)
                        }
                        else {

                            createFilteredListInterface($applianceInputDiv, app, 'appliance', data)
                        }
                        

                        if(type === 'ustensils'){
                            createFilteredListInterface($ustensilsInputDiv, filterElementsListViaInput(ust), 'ustensils', data)
                        }
                        else {
                            createFilteredListInterface($ustensilsInputDiv, ust, 'ustensils', data)
                        }


                    }
                    else {
        
                        handleCrossSearchEngineChange()
                    }
                    
                    
                }
                else {
        
                    handleCrossSearchEngineChange()
                    
                }
            }
            else {
                handleElementsListAfterMainSearchResults("")
         
            }

        }



    }
    else {

        console.log('main has not been fired')
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
                        $applianceInputDiv.firstChild.nextSibling.remove()
                        $ustensilsInputDiv.firstChild.nextSibling.remove()

                        const filterElementsListViaInput = (elementsArray) => {

                            let newFilteredList =  []
                            for( let el of elementsArray){
                    
                                if(el.includes(e.target.value)){
                                
                                    newFilteredList.push(el)
                                       
    
                                } 
                           
                    
                            }

                            return newFilteredList

                        }

                        if(type === "ingredients") {
                            createFilteredListInterface($ingredientsInputDiv, filterElementsListViaInput(ing), 'ingredients', data)
                        }
                        else {
                            createFilteredListInterface($ingredientsInputDiv, ing, 'ingredients', data)
                        }

                        if(type === 'appliance'){
                            createFilteredListInterface($applianceInputDiv, filterElementsListViaInput(app), 'appliance', data)
                        }
                        else {

                            createFilteredListInterface($applianceInputDiv, app, 'appliance', data)
                        }
                        

                        if(type === 'ustensils'){
                            createFilteredListInterface($ustensilsInputDiv, filterElementsListViaInput(ust), 'ustensils', data)
                        }
                        else {
                            createFilteredListInterface($ustensilsInputDiv, ust, 'ustensils', data)
                        }

                     

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