const bookshelf = new Bookshelf('http://localhost:3000')

document.addEventListener("DOMContentLoaded", () => {
    bookshelf.getBooks();
})

async function postBook(new_book, image){

    return fetch('http://localhost:3000/books', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': "application/json"
        },
        body: JSON.stringify({
            title: new_book.volumeInfo.title,
            author: new_book.volumeInfo.authors.join(),
            page_count: new_book.volumeInfo.pageCount,
            img: image
        })
        })
    .then(res => res.json())
    .then(book => {
        const b = new Book(book.id, book.title, book.author, book.img, book.page_count)
        b.renderBooks()
    })
}

async function googleBooksSearch(search) {
    return fetch(`https://www.googleapis.com/books/v1/volumes?q=${search}&key=AIzaSyBVOEuQ0f8FopsXl0HthBSJ1GIBIbI0C2Y`)
        .then(response => response.json())
        .then(results => renderGoogleResults(results))
        // .catch(err => {console.error(err)}) // add time interval delay to show errors
}

function renderGoogleResults(results){
    const googleResults = document.querySelector('.google-results')
    if (googleResults.hasChildNodes()) {
        googleResults.innerHTML = ''
    }
    let books = results.items
    for (let i = 0; i < books.length; i++){
        let bookTitle = books[i].volumeInfo.title
        let bookImg = books[i].volumeInfo.imageLinks.thumbnail
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
            // console.log(books[i])
            postBook(books[i], bookImg)
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

async function deleteBookFromBookshelf(id){
    fetch(`http://localhost:3000/books/${id}`, {
        method: `DELETE`,
        headers: {
            'Content-Type': 'application/json'
        },
        body: null
    })
}