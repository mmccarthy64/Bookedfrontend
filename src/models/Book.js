class Book {
    constructor(title, author, img, page_count){
        this.title = title;
        this.author = author;
        this.img = img;
        this.page_count = page_count;
        this.renderBook = this.renderBook.bind(this)
    }

    renderBook(){
        console.log(this)
    }
}