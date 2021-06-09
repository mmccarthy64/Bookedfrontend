class Bookshelf {
    constructor(bookshelfURL){
        this.bookshelfURL = `${bookshelfURL}/api/books`
    }

    async getBooks(){
        fetch('http://localhost:3000/books')
            .then(resp => resp.json())
            .then(books => books.forEach(book => {
                const b = new Book(book)
                b.renderBooks()
        }))
    }
}