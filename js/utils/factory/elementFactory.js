import { filterRecipesViaKeyWord } from "../filters/recipesFilters.js"
import { createKeywordInterface } from "./keywordFactory.js"
import { createRecipeInterface } from "./recipeFactory.js"

export const createFilteredListInterface = (domElement, list, type, recipes) => {
 
    const $elementsDiv = document.createElement('div')
    $elementsDiv.classList.add('elements-div')


    if(type === 'ingredients'){
        $elementsDiv.classList.add('search-blue') 

       
            
    }
    if(type === 'appliance'){
        $elementsDiv.classList.add('search-green') 
    }  
    if(type === 'ustensils'){
        $elementsDiv.classList.add('search-red') 
    }


    if(list.length <= 10){
        $elementsDiv.classList.add('lesser-11');
    }

    if(list.length > 10 && list.length < 21){

        $elementsDiv.classList.add('greater-10-lesser-21');
        domElement.classList.add('strech-grid-like-10-21');
    }

    if(list.length > 20 && list.length < 31){
        $elementsDiv.classList.add('greater-20-lesser-31');
        domElement.classList.add('strech-grid-like-20-31');
    }

 
   


        list.forEach((el) => {

            console.log('list.forEach');
            let span = document.createElement('span');
            span.classList.add('element-div')
            span.innerText = el
            
            span.onclick = () => {


             
              let updatedRecipesList = filterRecipesViaKeyWord(recipes,type,el)

              /** update recipesInterface */
                createRecipeInterface(updatedRecipesList)
                createKeywordInterface(el, type)


            }


           
            $elementsDiv.appendChild(span)

        })

       
        let message = [
            'Rechercher un ingrédient',
            'Rechercher un appareil',
            'Rechercher un ustensil'
        ]

       
        domElement.firstChild.firstChild.placeholder = type === 'ingredients' ? message[0]
                                                                            :  type === 'appliance' ? message[1]
                                                                            : message[2]

        domElement.appendChild($elementsDiv)


    
   
}
           
               

