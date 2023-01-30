import Filters from '../components/filtersSection/index.js';
import Recipes from '../components/recipesSection/index.js';
import Header from '../components/header/index.js'
import {createSearchEngineInterface} from '../utils/factory/searchEngineFactory.js'

import { handleChange } from '../utils/searchForm/index.js';




// const routes = [

//     {
//         path: "/",
//         component: Header

//     }


// ]




const bindEventListeners = async() => {
      
        
    handleChange()

   

   
}



export const router = async() => {
    
   



    document.querySelector('#root').innerHTML =  `
    ${await Header.render()}
    ${await Filters.render()}
    ${await Recipes.render()}`
    
    await createSearchEngineInterface()
   
    await bindEventListeners()

    

}