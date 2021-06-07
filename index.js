let viewComments = false

document.addEventListener("DOMContentLoaded", () => {
    getBooks();
})

function getBooks(){
    return fetch('http://localhost:3000/books')
        .then(resp => resp.json())
        .then(books => books.forEach(book => {
            book = new Book(book.title, book.author, book.img, book.page_count)
            console.log(book)
        }))
}

// const newBook = document.getElementById('new-book-btn').addEventListener('click', postBook)
// const newBookForm = document.querySelector('#new-book-form')

async function postBook(new_book, image){
    console.log(new_book.volumeInfo.authors)
    console.log(new_book.volumeInfo.imageLinks.thumbnail.toString())
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
    .then((book) => {
        book = new Book(book.title, book.author, book.img, book.page_count)
        // console.log(book)
        renderBooks(book)
    })
}

// function renderBooks(book) {
//     const booksContainer = document.getElementById('books-container')
//     let h2 = document.createElement('h2')
//     h2.innerText = book.title

//     let p = document.createElement('p')
//     p.innerText = book.author

//     let img = document.createElement('img')
//     if(book.img != ""){
//         img.setAttribute('src', book['img'])
//         img.setAttribute('class', 'book-image')
//     }

//     let btn = document.createElement('button')
//     btn.innerText = "Delete from Library"
//     btn.addEventListener('click', (e) => {
//         e.preventDefault()
//         divCard.remove()
//         deleteBookFromBookshelf(book.id)
//     })

//     // let cbtn = document.createElement('button')
//     // cbtn.innerText = "View Comments"
//     // cbtn.addEventListener('click', (e) => {
//     //     e.preventDefault()
//     //     console.log(book)
//     //     fetchComments(book.id)
//     //     // console.log(comments)
//     // })

//     let divCard = document.createElement('div')
//     divCard.setAttribute('class', 'card')
//     divCard.setAttribute('id', book.id)

//     divCard.append(h2, p, img, btn)
//     booksContainer.append(divCard)
// }

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
            console.log(books[i])
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
    // console.log(search)
    googleBooksSearch(search);
})

async function deleteBookFromBookshelf(id){
    return fetch(`http://localhost:3000/books/${id}`, {
        method: `DELETE`,
        headers: {
            'Content-Type': 'application/json'
        },
        body: null
    })
}

// function fetchComments(book) {
//     let comments
//     fetch(`http://localhost:3000/books/${book}/comments`)
//         .then(response => response.json())
//         .then(results => results.forEach(obj => {
//             if (obj.book_id === book){
//                 // console.log(obj)
//                 comments = new Comment(obj.content, obj.book_id, obj.user_id)
//             }
//         }))
//         console.log(comments)
//         renderComments(book, comments)
// }

// class Comment {
//     constructor(content, book_id, user_id){
//         this.content = content;
//         this.book = book_id
//         this.user = user_id
//     }
// }

// function renderComments(book, comments) {
//     console.log(comments)
//     console.log(book)
//     let bookCard = document.getElementById(book)
//     let commentArea = document.createElement('div')
//     bookCard.append(commentArea)
//     let ul = document.createElement('ul')
//     commentArea.append(ul)
//     console.log(comments.length)
//     for(let i =0; i < comments.length; i++){
//         console.log(comments)
//     }
// }