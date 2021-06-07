class Book {
    constructor(title, author, img, page_count){
        this.title = title;
        this.author = author;
        this.img = img;
        this.page_count = page_count;
        this.renderBook = this.renderBook.bind(this)
    }

    getBooks = () => {
        return fetch('http://localhost:3000/books')
            .then(resp => resp.json())
            .then(books => books.forEach(book => renderBooks(book)))
    }

    renderBooks = book => {
        console.log(this)
        const booksContainer = document.getElementById('books-container')
        let h2 = document.createElement('h2')
        h2.innerText = book.title
    
        let p = document.createElement('p')
        p.innerText = book.author
    
        let img = document.createElement('img')
        if(book.img != ""){
            img.setAttribute('src', book['img'])
            img.setAttribute('class', 'book-image')
        }
    
        let btn = document.createElement('button')
        btn.innerText = "Delete from Library"
        btn.addEventListener('click', (e) => {
            e.preventDefault()
            divCard.remove()
            deleteBookFromBookshelf(book.id)
        })
    
        // let cbtn = document.createElement('button')
        // cbtn.innerText = "View Comments"
        // cbtn.addEventListener('click', (e) => {
        //     e.preventDefault()
        //     console.log(book)
        //     fetchComments(book.id)
        //     // console.log(comments)
        // })
    
        let divCard = document.createElement('div')
        divCard.setAttribute('class', 'card')
        divCard.setAttribute('id', book.id)
    
        divCard.append(h2, p, img, btn)
        booksContainer.append(divCard)
    }
}