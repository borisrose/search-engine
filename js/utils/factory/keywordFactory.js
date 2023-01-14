export const createKeywordInterface = (el,type) => {

    console.log('createKeywordInterface =================>')
    const keywordsDiv = document.querySelector('.key-words-div')


    keywordsDiv.appendChild(createKeywordWrapper(el, type))



}


const createKeywordWrapper = (el, type) => {

    console.log('createKeywordWrapper =================>')

    const keywordDiv = document.createElement('div')
    const deleteDiv = document.createElement('div')
    const wordDiv = document.createElement('div')



    keywordDiv.classList.add('keyword-box-div')

    if(type === 'ingredients'){
        keywordDiv.classList.add('search-blue')
    }

    if(type === 'appliance'){
        keywordDiv.classList.add('search-green')
    }

    if(type === 'ustensils'){
        keywordDiv.classList.add('search-red')
    }


    wordDiv.classList.add('word-div')
    
    wordDiv.innerHTML = el

    deleteDiv.classList.add('delete-div')

    deleteDiv.innerHTML = '<i class="far fa-times-circle"></i>'

    deleteDiv.onclick = () => {

        keywordDiv.parentNode.removeChild(keywordDiv)
    }

    keywordDiv.appendChild(wordDiv)

    keywordDiv.appendChild(deleteDiv)


    return keywordDiv
}