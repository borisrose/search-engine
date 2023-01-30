



const createIngredientWrapper = (ing) => {


    const $ingredientWrapper = document.createElement('div')

    const $ingredientSpan = document.createElement('span')
    $ingredientSpan.classList.add('ing-ing-span')
    $ingredientSpan.innerHTML = `${ing.ingredient}: `

    const $quantitySpan = document.createElement('span')
    
    if(ing.quantity){

        $quantitySpan.classList.add('ing-qua-span')
        $quantitySpan.innerHTML = ing.quantity
    }
    

    
    const $unitSpan = document.createElement('span')
    
    if(ing.unit){
    
        $unitSpan.classList.add('ing-uni-span')
        if(ing.unit.length > 2){
            $unitSpan.innerHTML = ` ${ing.unit}`
        }
        else {
            $unitSpan.innerHTML = ing.unit
        }
       

    }



    $ingredientWrapper.appendChild($ingredientSpan)
  

    if(ing.quantity){
        $ingredientWrapper.appendChild($quantitySpan)
    }

    if(ing.unit){
        $ingredientWrapper.appendChild($unitSpan)
    }
   


    return $ingredientWrapper


}

const createRecipeWrapper = (rec) => {




    const $article = document.createElement('article')
    $article.classList.add('article-recipe')
    
    const $imageSection = document.createElement('section')
    $imageSection.classList.add('img-section-recipe')

    const $infoSection = document.createElement('section')
    $infoSection.classList.add('info-section-recipe')

    const $nameTimeWrapper = document.createElement('div');
    $nameTimeWrapper.classList.add('info-time-name-div')
    const $nameDiv = document.createElement('div')
    const $timeDiv = document.createElement('div')
    $nameDiv.classList.add('info-name')
    $nameDiv.innerHTML = `<p>${rec.name}</p>`
    $timeDiv.classList.add('info-time')
    $timeDiv.innerHTML = `<i class="far fa-clock time-icon"></i><span class='time-mn'>${rec.time} mn</span>` 

    const $ingredientDescriptionWrapper = document.createElement('div')
    $ingredientDescriptionWrapper.classList.add('info-ing-des-div')
    const $ingredientDiv = document.createElement('div')
    const $descriptionDiv = document.createElement('div')
    $ingredientDiv.classList.add('info-ing')
    

    for(let ing of rec.ingredients){

        $ingredientDiv.appendChild(createIngredientWrapper(ing))
    }



    $descriptionDiv.classList.add('info-des')
    $descriptionDiv.innerHTML = `<p>${rec.description}</p>`

    $infoSection.appendChild($nameTimeWrapper)
    $nameTimeWrapper.appendChild($nameDiv)
    $nameTimeWrapper.appendChild($timeDiv)

    $infoSection.appendChild($ingredientDescriptionWrapper)
    $ingredientDescriptionWrapper.appendChild($ingredientDiv)
    $ingredientDescriptionWrapper.appendChild($descriptionDiv)

    $article.appendChild($imageSection)
    $article.appendChild($infoSection)
 

    return $article
}



export const createRecipeInterface = (data) => {


    console.log('createRecipe Interface called')

    const recipes = data

    const $recipesWrapper = document.getElementById('recipes-div')
    $recipesWrapper.innerHTML = ""
    
    if(recipes !== null){

        recipes.forEach(recipe =>    
           $recipesWrapper.appendChild(createRecipeWrapper(recipe))
        );
    }
    else {
      emptyRecipeInterface()  
    }


}

export const emptyRecipeInterface = () => {

    const $recipesWrapper = document.getElementById('recipes-div')

    $recipesWrapper.innerHTML = ""
}


