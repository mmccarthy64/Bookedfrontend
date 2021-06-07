class Book {
    constructor(id, title, author, img, page_count){
        this.id = id;
        this.title = title;
        this.author = author;
        this.img = img;
        this.page_count = page_count;
    }
    
    static getBooks = () => {
        return fetch('http://localhost:3000/books')
            .then(resp => resp.json())
            .then(books => books.forEach(book => {
                // console.log(book)
                book = new Book(book.id, book.title, book.author, book.img, book.page_count)
                Book.renderBooks(book)
        }))
    }

    static renderBooks = (book) => {
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
    
        let commentBlock = document.createElement('div')

        let cbtn = document.createElement('button')
        cbtn.innerText = "View Comments"
        cbtn.setAttribute('id', book.id)
        cbtn.addEventListener('click', (e) => {
            e.preventDefault()
            Comment.handleButton(parseInt(e.target.id))
            Comment.fetchComments(parseInt(e.target.id))
        })
    
        let divCard = document.createElement('div')
        divCard.setAttribute('class', 'card')
        divCard.setAttribute('id', book.id)
    
        divCard.append(h2, p, img, btn, cbtn, commentBlock)
        booksContainer.append(divCard)
    }

    
}