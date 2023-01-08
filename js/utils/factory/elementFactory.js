

export const createFilteredListInterface = (domElement, list) => {

    const $elementsDiv = document.createElement('div')



    for(let el of list){

        let span = document.createElement('span');
        span.classList.add('element-div')
        span.innerText = el
        $elementsDiv.appendChild(span)

    }

   
    domElement.appendChild($elementsDiv)
}
           
               

