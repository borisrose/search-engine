import {recipes} from '../../../recipes.js'

const Header = {


    search: (e) => {

        for(let recipe of recipes){

            if(recipe.name.startsWith(e) || recipe.description.startsWith(e)){

                console.log('recipe', recipe)

            }




        }





    },







    render : () => {

        function countToThree (e) {
     
            let test =   document.getElementById('search') ;
            if(test){ 
                console.log(test )
            }
            console.log(test)
            console.log('in fx')
         
            // if(counter >= 3){
            //     console.log(e.target.value)
            //    search(e.target.value)
    
            // } 
        }  
        return `
            <header>
            
                <h3>Les petits plats</h3>

                <div class="search-engine-div">
                    <input id='search' class="input-search-engine" type="search" onchange="${countToThree()}" /> 
                    <i class="far fa-search"></i>           
                </div>  
            </header>
            
        `

    }



}

export default Header