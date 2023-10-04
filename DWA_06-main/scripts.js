import { books,BOOKS_PER_PAGE,authors,genres } from './data.js';//get all the information from data javascript file 

const matches = books; 
let page = 1;
const range = [0,BOOKS_PER_PAGE]

//error messages
if (!books && !Array.isArray(books)) {
    throw new Error('Source required');
  }
 
if (!range && range.length < 2 && !Array.isArray(range)) {
    throw new Error('Range must be an array with two numbers');
  }
 
//data list  

const dataListItems= document.querySelector('[data-list-items]')
const dataListMessage= document.querySelector('[data-list-message]')
const dataListButton= document.querySelector('[data-list-button]')
const dataListActive= document.querySelector('[data-list-active]')
const dataListBlur= document.querySelector('[data-list-blur]')
const dataListImage= document.querySelector('[data-list-image]')
const dataListTitle= document.querySelector('[data-list-title]')
const dataListSubTitle= document.querySelector('[data-list-subtitle]')
const dataListDescription= document.querySelector('[data-list-description]')
const dataListClose= document.querySelector('[data-list-close]')

dataListItems.addEventListener('click',(event)=>{
  dataListActive.showModal();
  let pathArray = Array.from(event.path || event.composedPath());
  let active;
  
  for (const node of pathArray){
    if (active) break;
    const previewId = node?.dataset?.preview

    for (const singleBook of matches) {
      if (singleBook.id === previewId) {
        active = singleBook
        break;
      }
    } 
  }
  if (!active) return;
  dataListImage.src = active.image;
  dataListBlur.src = active.image;
  dataListTitle.textContent = active.title;
  const date = active.published.slice(0,4)
  dataListSubTitle.textContent = `${authors[active.author]} (${date})`;
  dataListDescription.textContent = active.description;

})

dataListClose.addEventListener('click',()=>{
  dataListActive.close()
})

function createPreview(preview){
  const { author: authorId, id, image, title } = preview

  const showPreview = document.createElement('button')
  showPreview.classList = 'preview'
  showPreview.setAttribute('data-preview', id)

  showPreview.innerHTML = /* html */ `
      <img
          class="preview__image"
          src="${image}"
      />
      
      <div class="preview__info">
          <h3 class="preview__title">${title}</h3>
          <div class="preview__author">${authors[authorId]}</div>
      </div>
  `
  return showPreview
}

function createRemainText(){
  dataListButton.innerHTML = /* html */ `
    <span>Show more</span>
    <span class="list__remaining"> (${remainingBooksCount > 0 ? remainingBooksCount: 0})</span>
  `;
}

const startIdx = (page - 1) * BOOKS_PER_PAGE;
const endIdx = startIdx + BOOKS_PER_PAGE;

const BookFragment = document.createDocumentFragment();
const BookExtracted= matches.slice(startIdx,endIdx);

for (const preview of BookExtracted){
  const showPreview = createPreview(preview);
  BookFragment.appendChild(showPreview)
}
dataListItems.appendChild(BookFragment)

dataListButton.innerHTML = /* html */` 
  <span>Show more</span>
  <span class="list__remaining"> (${matches.length - (page * BOOKS_PER_PAGE) > 0 ? matches.length - (page * BOOKS_PER_PAGE) : 0})</span>
`
dataListButton.addEventListener('click',()=>{
  page++;

  const newStartIdx = (page-1) * BOOKS_PER_PAGE;
  const newEndIdx = newStartIdx + BOOKS_PER_PAGE;
  
  const newBookFragment = document.createDocumentFragment();

  const newBookExtracted= matches.slice(newStartIdx,newEndIdx);

  for (const preview of newBookExtracted){
    const showPreview = createPreview(preview);
    newBookFragment.appendChild(showPreview)
  }

  dataListItems.appendChild(newBookFragment)

  const remainingBooksCount = matches.length - (page * BOOKS_PER_PAGE);

  createRemainText();
  
  dataListButton.disabled = remainingBooksCount <= 0 ;
})

// Search and Filter

const dataSearchHeader= document.querySelector('[data-header-search]')
const dataSearchOverlay= document.querySelector('[data-search-overlay]')
const dataSearchForm= document.querySelector('[data-search-form]')
const dataSearchTitle= document.querySelector('[data-search-title]')
const dataSearchGenres= document.querySelector('[data-search-genres]')
const dataSearchAuthors= document.querySelector('[data-search-authors]')
const dataSearchCancel= document.querySelector('[data-search-cancel]')

dataSearchHeader.addEventListener('click',()=>{
  dataSearchOverlay.showModal();
  dataSearchTitle.focus();
})

const genresFragment = document.createDocumentFragment();

// Create and append the "All Genres" option
const allGenresOption = document.createElement('option');
allGenresOption.value = 'any';
allGenresOption.innerText = 'All Genres';
genresFragment.appendChild(allGenresOption);

// Loop through Genres and create options
for (const [id, name] of Object.entries(genres)) {
  const genreOption = document.createElement('option');
  genreOption.value = id;
  genreOption.innerText = name;
  genresFragment.appendChild(genreOption);
}

dataSearchGenres.appendChild(genresFragment);

const authorsFragment = document.createDocumentFragment();

// Create and append the "All Authors" option
const allAuthorsOption = document.createElement('option');
allAuthorsOption.value = 'any';
allAuthorsOption.innerText = 'All Authors';
authorsFragment.appendChild(allAuthorsOption);

// Loop through authors and create options
for (const [id, name] of Object.entries(authors)) {
  const authorOption = document.createElement('option');
  authorOption.value = id;
  authorOption.innerText = name;
  authorsFragment.appendChild(authorOption);
}

dataSearchAuthors.appendChild(authorsFragment);

dataSearchForm.addEventListener('submit', (event) => {
  event.preventDefault()
  const formData = new FormData(event.target)
  const filters = Object.fromEntries(formData)
  const result = []

  for (const book of books) {
    const titleMatch = filters.title.trim() !== '' && book.title.toLowerCase().includes(filters.title.toLowerCase())
    const genreMatch = filters.genre !== 'any' && book.genres.includes(filters.genre)
    const authorMatch = filters.author !== 'any' && book.author.includes(filters.author)

    if (titleMatch || authorMatch || genreMatch) {
        result.push(book)
    }
}

let page = 1;
if (result.length === 0   ){
  dataListItems.innerHTML = '';
  dataListButton.disabled=true;
  dataListMessage.classList.add('list__message_show');

  const remainingBooksCount = result.length - (page * BOOKS_PER_PAGE);
  createRemainText();
}else {
  dataListMessage.classList.remove('list__message_show')
  dataListItems.innerHTML = '';

  
  const searchStartIdx = (page-1) * BOOKS_PER_PAGE;
  const searchEndIdx = searchStartIdx + BOOKS_PER_PAGE;
  
  const searchBookFragment = document.createDocumentFragment();

  const searchBookExtracted= result.slice(searchStartIdx,searchEndIdx);

  for (const preview of searchBookExtracted){
    const showPreview = createPreview(preview);
    searchBookFragment.appendChild(showPreview)
  }

  dataListItems.appendChild(searchBookFragment)

  const remainingBooksCount = result.length - (page * BOOKS_PER_PAGE);

 createRemainText();
  
  dataListButton.disabled = remainingBooksCount <= 0 ;
}

window.scrollTo({ top: 0, behavior: 'smooth' });
dataSearchOverlay.close()
dataSearchForm.reset()
})

dataSearchCancel.addEventListener('click',()=>{
  dataSearchOverlay.close();
})

//settings

const dataSettingsHeader= document.querySelector('[data-header-settings]')
const dataSettingsOverlay= document.querySelector('[data-settings-overlay]')
const dataSettingsForm= document.querySelector('[data-settings-form]')
const dataSettingsTheme= document.querySelector('[data-settings-theme]')
const dataSettingsCancel= document.querySelector('[data-settings-cancel]')

dataSettingsHeader.addEventListener('click',()=>{
  dataSettingsOverlay.showModal();
})
dataSettingsCancel.addEventListener('click',()=>{
  dataSettingsOverlay.close();
})
const css = {
  day : ['255, 255, 255','10, 10, 20'],
  night :['10, 10, 20','255, 255, 255']
}

dataSettingsTheme.value = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'night' : 'day'

dataSettingsForm.addEventListener('submit',(event)=>{
  event.preventDefault();
  const formSubmit = new FormData(event.target)
  const resultSelected = Object.fromEntries(formSubmit)
  const rootStyles = document.documentElement.style
  
  if (resultSelected.theme ==='night'){
    rootStyles.setProperty('--color-light', css[resultSelected.theme][0]);
    rootStyles.setProperty('--color-dark', css[resultSelected.theme][1]);
}else if (resultSelected.theme ==='day'){
  rootStyles.setProperty('--color-light', css[resultSelected.theme][0]);
  rootStyles.setProperty('--color-dark', css[resultSelected.theme][1]);
} 
  dataSettingsOverlay.close();
})
