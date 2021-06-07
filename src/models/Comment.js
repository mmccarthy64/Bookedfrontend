let viewComments = false
class Comment {
    constructor(content, book_id, user_id){
        this.content = content;
        this.book = book_id
        this.user = user_id
    }

    static fetchComments = (bookId) => {
        console.log(bookId)
        // let comments
        fetch(`http://localhost:3000/books/${bookId}/comments`)
            .then(response => response.json())
            .then(comments => comments.forEach(comment => {
                if (comment.book_id === bookId){
                    comment = new Comment(comment.content, comment.book_id, comment.user_id)
                    Comment.renderComments(comment)
                }
            }))
            // console.log(comment)
            // renderComments(book, comments)
    }

    static renderComments(comment) {
        console.log(comment.content)
        let comSpace = document.getElementById('#comments-space')
        // console.log(ul)
        let line = document.createElement('li')
        line.textContent = comment.content
        comSpace.append(line)
    }

    static handleButton = bookId => {
        console.log(bookId)
        let card = document.getElementById(bookId)
        let commentButton = card.children[4]
        let elements = [card.children[2], card.children[3]]
        console.log(elements)
        viewComments = !viewComments
        if(viewComments){
            commentButton.textContent = 'Hide Comments'
            for (let i = 0; i < elements.length; i++){
                elements[i].style.display = 'none'
            }
        } else {
            commentButton.textContent = 'View Comments'
            for (let i = 0; i < elements.length; i++){
                elements[i].style.display = 'block'
            }
        }
    }
}