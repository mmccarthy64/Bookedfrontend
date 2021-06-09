class Book {
    constructor({id, title, author, page_count, img}){
        this.id = id;
        this.title = title;
        this.author = author;
        this.page_count = page_count;
        this.img = img;
    }

    static postBook(new_book, image){

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
            const b = new Book(book)
            b.renderBooks()
        })
    }

    renderBooks(){
        const booksContainer = document.getElementById('books-container')
        let h2 = document.createElement('h2')
        h2.innerText = this.title
    
        let p = document.createElement('p')
        p.innerText = this.author
    
        let img = document.createElement('img')
        if(this.img != ""){
            img.setAttribute('src', this.img)
            img.setAttribute('class', 'book-image')
        }
    
        let btn = document.createElement('button')
        btn.innerText = "Delete from Bookshelf"
        btn.addEventListener('click', (e) => {
            e.preventDefault()
            divCard.remove()
            this.deleteBookFromBookshelf(this.id)
        })
    
        let commentBlock = document.createElement('div')

        let cbtn = document.createElement('button')
        cbtn.innerText = "View Comments"
        cbtn.setAttribute('id', this.id)
        cbtn.addEventListener('click', (e) => {
            e.preventDefault()
            Comment.handleButton(parseInt(e.target.id))
            Comment.fetchComments(parseInt(e.target.id))
        })
    
        let divCard = document.createElement('div')
        divCard.setAttribute('class', 'card')
        divCard.setAttribute('id', this.id)
    
        divCard.append(h2, p, img, btn, cbtn, commentBlock)
        booksContainer.append(divCard)
    }

    async deleteBookFromBookshelf(id){
        fetch(`http://localhost:3000/books/${id}`, {
            method: `DELETE`,
            headers: {
                'Content-Type': 'application/json'
            },
            body: null
        })
    }
}