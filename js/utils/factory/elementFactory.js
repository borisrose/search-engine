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

 
   
 
    
    
    
        for(let el of list){
    
            
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
    
        }
       
        let message = [
            'Rechercher un ingrédient',
            'Rechercher un appareil',
            'Rechercher un ustensil'
        ]

        console.log(domElement.firstChild.firstChild)
        domElement.firstChild.firstChild.placeholder = type === 'ingredients' ? message[0]
                                                                            :  type === 'appliance' ? message[1]
                                                                            : message[2]

        domElement.appendChild($elementsDiv)


    
   
}
           
               

