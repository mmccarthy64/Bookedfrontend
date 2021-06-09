class Bookshelf {
    constructor(bookshelfURL){
        this.bookshelfURL = `${bookshelfURL}/api/books`
    }

    async getBooks(){
        return fetch('http://localhost:3000/books')
            .then(resp => resp.json())
            .then(books => books.forEach(book => {
                // console.log(book)
                book = new Book(book.id, book.title, book.author, book.img, book.page_count)
                Book.renderBooks(book)
        }))
    }
}