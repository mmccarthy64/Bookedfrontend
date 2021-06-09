class Book {
    constructor(id, title, author, img, page_count){
        this.id = id;
        this.title = title;
        this.author = author;
        this.img = img;
        this.page_count = page_count;
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
        btn.innerText = "Delete from Library"
        btn.addEventListener('click', (e) => {
            e.preventDefault()
            divCard.remove()
            deleteBookFromBookshelf(this.id)
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

    
}