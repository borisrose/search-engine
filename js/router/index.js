import Filters from '../components/filtersSection/index.js';
import Recipes from '../components/recipesSection/index.js';
import Header from '../components/header/index.js'


import { handleChange } from '../utils/searchForm.js/index.js';


console.log('into router index.js');

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
    
   


    console.log('into router function')

    document.querySelector('#root').innerHTML =  `
    ${await Header.render()}
    ${await Filters.render()}
    ${await Recipes.render()}
    
    ` 
   
    await bindEventListeners()

    

}