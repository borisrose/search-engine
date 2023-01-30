import { handleSearchEngineChange } from "../searchForm/index.js"


const searchTypes = [

    'Ingredients',
    'Appareils',
    'Ustensiles'

]




const createSearchEngine = (type) => {

   

    const $filtersDiv = document.querySelector('.filters-div')

    
    const $typeDiv = document.createElement('div')

    type === searchTypes[0] ? $typeDiv.classList.add('search-blue') 
                            : type === searchTypes[1]  ? $typeDiv.classList.add('search-green')
                            : $typeDiv.classList.add('search-red')  

    $typeDiv.classList.add('type-div-style')

    type === searchTypes[0] ? $typeDiv.id = 'ingredients'
                             : type === searchTypes[1]  ? $typeDiv.id = 'appliance'
                             : $typeDiv.id = 'ustensils'

    const $dualElement = document.createElement('div')

    $dualElement.classList.add('dual-element')

    const $typeInput = document.createElement('input')

    $typeInput.classList.add('type-input')/*80% */

    type === searchTypes[0] ? $typeInput.classList.add('search-blue') 
                            : type === searchTypes[1]  ? $typeInput.classList.add('search-green')
                            : $typeInput.classList.add('search-red')  

    type === searchTypes[0] ? $typeInput.id = searchTypes[0] 
                            : type === searchTypes[1]  ? $typeInput.id = searchTypes[1] 
                            : $typeInput.id = searchTypes[2] 


    $typeInput.setAttribute('placeholder', type)

    const $typeChevronDirection = document.createElement('i')

    $typeChevronDirection.classList.add('chevron-style')/*20% */
    $typeChevronDirection.classList.add('fa')/*20% */
    $typeChevronDirection.classList.add('fa-chevron-down')/*20% */

    $typeChevronDirection.onclick = () => {

      
        let chevronClasses = Array.from($typeChevronDirection.classList);
        if(chevronClasses[2] === 'fa-chevron-down'){

            $typeChevronDirection.classList.remove('fa-chevron-down')/*20% */
            $typeChevronDirection.classList.add('fa-chevron-up')

            let $divChildren = Array.from($typeDiv.childNodes);

            if($divChildren.length > 1){
                $typeDiv.firstChild.nextSibling.style.display = 'grid'
            }

        }
        else {
            $typeChevronDirection.classList.remove('fa-chevron-up')
            $typeChevronDirection.classList.add('fa-chevron-down')/*20% */

            let $divChildren = Array.from($typeDiv.childNodes);

            if($divChildren.length > 1){
                $typeDiv.firstChild.nextSibling.style.display = 'none'
            }
        }

    }
    


    $filtersDiv.appendChild($typeDiv)
    $typeDiv.appendChild($dualElement)
    $dualElement.appendChild($typeInput)
    $dualElement.appendChild($typeChevronDirection)

}



export const createSearchEngineInterface = async(data) => {

    const $filtersDiv = document.querySelector('.filters-div')

    if(Array.from($filtersDiv.childNodes).length > 0){
        $filtersDiv.innerHTML ="";
      
    }


    for(let t of searchTypes){

        createSearchEngine(t)
        handleSearchEngineChange(t, data)
    }

}

