const bookshelf = new Bookshelf('http://localhost:3000')

document.addEventListener("DOMContentLoaded", () => {
    bookshelf.getBooks();
})

async function googleBooksSearch(search) {
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${search}&key=AIzaSyBVOEuQ0f8FopsXl0HthBSJ1GIBIbI0C2Y`)
        .then(response => response.json())
        .then(results => renderGoogleResults(results))
        // .catch(err => {console.error(err)}) // add time interval delay to show errors
}

function renderGoogleResults(results){
    const googleResults = document.querySelector('.google-results')
    if (googleResults.hasChildNodes()) {
        googleResults.innerHTML = ''
    }
    let googleBooks = results.items
    for (let i = 0; i < googleBooks.length; i++){
        let bookTitle = googleBooks[i].volumeInfo.title
        let bookImg = googleBooks[i].volumeInfo.imageLinks.thumbnail
        let bookPreview = document.createElement('div')
        bookPreview.setAttribute('class', 'card')

        let h2 = document.createElement('h2')
        h2.innerText = bookTitle.substr(0,30)
        let img = document.createElement('img')
        img.setAttribute('src', bookImg)
        img.setAttribute('class', 'book-image')

        let btn = document.createElement('button')
        btn.innerText = "Add to Bookshelf"
        btn.addEventListener('click', e => {
            e.preventDefault()
            Book.postBook(googleBooks[i], bookImg)
        })

        bookPreview.append(h2, img, btn)
        googleResults.append(bookPreview)
    }
}

const searchForm = document.querySelector('.search-box')
searchForm.addEventListener('submit', e => {
    e.preventDefault();
    let search = document.querySelector('.search-title').value
    googleBooksSearch(search);
})