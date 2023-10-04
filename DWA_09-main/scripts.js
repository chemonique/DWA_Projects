import { books, authors, genres, BOOKS_PER_PAGE } from './data.js' 
let page = 1;
let matches = books

/**
 * @param {string} dataAttr 
 * @param {string} [value]
 * @param {HTMLElement}
 */
const getHtml = (dataAttr, value) =>{
  const selector = value ? `[data-${dataAttr}="value"]` : `data-${dataAttr}`;
  const element = document.querySelector(selector);
  const isHtmlElement = element instanceof HTMLElement;

  if (!isHtmlElement) {
    throw new Error(`${selector} attribute not found in HTML`);
  }
  return element;
}

function createPreview(preview){
    const { author: authorId, id, image, title } = preview
        const element = document.createElement('button')
        element.classList = 'preview'
        element.setAttribute('data-preview', id)
    
        element.innerHTML = `
            <img
                class="preview__image"
                src="${image}"
            />
            
            <div class="preview__info">
                <h3 class="preview__title">${title}</h3>
                <div class="preview__author">${authors[author]}</div>
            </div>
        `
        return element   
}

const starting = document.createDocumentFragment()
 
for (const preview of matches.slice(0, BOOKS_PER_PAGE)){
    const showpreview = createPreview(preview)
    starting.appendChild(showpreview)
 }
getHtml(list-items).appendChild(starting)

const filter = (value) => {
  const optionHtml = document.createDocumentFragment()
  const firstOptionElement = document.createElement('option')
  firstOptionElement.value = 'any'
  firstOptionElement.innerText = `All ${value}`
  optionHtml.appendChild(firstOptionElement)
  
  for (const [id, name] of Object.entries(value)) {
      const element = document.createElement('option')
      element.value = id
      element.innerText = name
      optionHtml.appendChild(element)
  }
  
  getHtml(search-`${value}`).appendChild(optionHtml) 
}
filter(genres);
filter(authors);

if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    getHtml(settings-theme).value = 'night'
    document.documentElement.style.setProperty('--color-dark', '255, 255, 255');
    document.documentElement.style.setProperty('--color-light', '10, 10, 20');
} else {
    getHtml(settings-theme).value = 'day'
    document.documentElement.style.setProperty('--color-dark', '10, 10, 20');
    document.documentElement.style.setProperty('--color-light', '255, 255, 255');
}

const listButton = getHtml(list-button)
listButton.innerText = `Show more (${books.length - BOOKS_PER_PAGE})`
listButton.disabled = (matches.length - (page * BOOKS_PER_PAGE)) > 0

listButton.innerHTML = `
    <span>Show more</span>
    <span class="list__remaining"> (${(matches.length - (page * BOOKS_PER_PAGE)) > 0 ? (matches.length - (page * BOOKS_PER_PAGE)) : 0})</span>
`

getHtml(search-cancel).addEventListener('click', () => {
    getHtml(search-overlay).open = false
})

getHtml(settings-cancel).addEventListener('click', () => {
    getHtml(settings-overlay).open = false
})

getHtml(header-search).addEventListener('click', () => {
    getHtml(search-overlay).open = true 
    getHtml(search-title).focus()
})

getHtml(header-settings).addEventListener('click', () => {
    getHtml(settings-overlay).open = true 
})

getHtml(list-close).addEventListener('click', () => {
    getHtml(list-active).open = false
})

getHtml(settings-form).addEventListener('submit', (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const { theme } = Object.fromEntries(formData)

    if (theme === 'night') {
        document.documentElement.style.setProperty('--color-dark', '255, 255, 255');
        document.documentElement.style.setProperty('--color-light', '10, 10, 20');
    } else {
        document.documentElement.style.setProperty('--color-dark', '10, 10, 20');
        document.documentElement.style.setProperty('--color-light', '255, 255, 255');
    }
    
    getHtml(settings-overlay).open = false
})

getHtml(search-form).addEventListener('submit', (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const filters = Object.fromEntries(formData)
    const result = []

    for (const book of books) {
        let genreMatch = filters.genre === 'any'

        for (const singleGenre of book.genres) {
            if (genreMatch) break;
            if (singleGenre === filters.genre) { genreMatch = true }
        }

        if (
            (filters.title.trim() === '' || book.title.toLowerCase().includes(filters.title.toLowerCase())) && 
            (filters.author === 'any' || book.author === filters.author) && 
            genreMatch
        ) {
            result.push(book)
        }
    }

    page = 1;
    matches = result

    if (result.length < 1) {
        getHtml(list-message).classList.add('list__message_show')
    } else {
        getHtml(list-message).classList.remove('list__message_show')
    }

    getHtml(list-items).innerHTML = ''
    const newItems = document.createDocumentFragment()
    
    for (const preview of result.slice(0, BOOKS_PER_PAGE)){
        const showpreview = createPreview(preview)
        newItems.appendChild(showpreview)
     }

    getHtml(list-items).appendChild(newItems)
    getHtml(list-button).disabled = (matches.length - (page * BOOKS_PER_PAGE)) < 1

    getHtml(list-button).innerHTML = `
        <span>Show more</span>
        <span class="list__remaining"> (${(matches.length - (page * BOOKS_PER_PAGE)) > 0 ? (matches.length - (page * BOOKS_PER_PAGE)) : 0})</span>
    `

    window.scrollTo({top: 0, behavior: 'smooth'});
    getHtml(search-overlay).open = false
})

getHtml(list-button).addEventListener('click', () => {
    const fragment = document.createDocumentFragment()
    
    for (const preview of matches.slice(page * BOOKS_PER_PAGE, (page + 1) * BOOKS_PER_PAGE)){
        const showpreview = createPreview(preview)
        fragment.appendChild(showpreview)
     }

    getHtml(list-items).appendChild(fragment)
    page += 1
})

getHtml(list-items).addEventListener('click', (event) => {
    const pathArray = Array.from(event.path || event.composedPath())
    let active = null

    for (const node of pathArray) {
        if (active) break

        if (node?.dataset?.preview) {
            let result = null
    
            for (const singleBook of books) {
                if (result) break;
                if (singleBook.id === node?.dataset?.preview) result = singleBook
            } 
        
            active = result
        }
    }
    
    if (active) {
        getHtml(list-active).open = true
        getHtml(list-blur).src = active.image
        getHtml(list-image).src = active.image
        getHtml(list-title).innerText = active.title
        getHtml(list-subtitle).innerText = `${authors[active.author]} (${new Date(active.published).getFullYear()})`
        getHtml(list-description).innerText = active.description
    }

})