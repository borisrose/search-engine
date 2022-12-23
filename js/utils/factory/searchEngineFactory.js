import { handleSearchEngineChange } from "../searchForm/index.js"


const searchTypes = [

    'Ingredients',
    'Appareils',
    'Ustensiles'

]




const createSearchEngine = (type) => {

    console.log('into Create Search Engine')

    const $filtersDiv = document.querySelector('.filters-div')
    
    const $typeDiv = document.createElement('div')

    type === searchTypes[0] ? $typeDiv.classList.add('search-blue') 
                            : type === searchTypes[1]  ? $typeDiv.classList.add('search-green')
                            : $typeDiv.classList.add('search-red')  

    $typeDiv.classList.add('type-div-style')

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
    


    $filtersDiv.appendChild($typeDiv)
    $typeDiv.appendChild($dualElement)
    $dualElement.appendChild($typeInput)
    $dualElement.appendChild($typeChevronDirection)

}



export const createSearchEngineInterface = async() => {


    searchTypes.forEach(t => {

        createSearchEngine(t)
        handleSearchEngineChange(t)
    })

}

