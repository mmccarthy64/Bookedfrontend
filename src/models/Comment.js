let viewComments = false
class Comment {
    constructor(content, book_id, user_id){
        this.content = content;
        this.book = book_id
        this.user = user_id
    }

    static fetchComments(bookId){
        fetch(`http://localhost:3000/books/${bookId}/comments`)
            .then(response => response.json())
            .then(comments => comments.forEach(comment => {
                if (comment.book_id === bookId){
                    comment = new Comment(comment.content, comment.book_id, comment.user_id)
                    Comment.renderComments(comment)
                }
            }))
    }

    static renderComments(comment) {
        // console.log(comment)
        const commentDiv = document.getElementById(comment.book).children[5]
        const li = document.createElement('li')
        li.textContent = comment.content
        commentDiv.append(li)
    }

    static handleButton = bookId => {
        const card = document.getElementById(bookId)
        const commentButton = card.children[4]
        const commentArea = card.children[5]
        commentArea.innerHTML = ''
        let elements = [card.children[2], card.children[3]]
        viewComments = !viewComments
        if(viewComments){
            commentButton.textContent = 'Hide Comments'
            for (let i = 0; i < elements.length; i++){
                elements[i].style.display = 'none'
            }
            commentArea.style.display = 'block'
        } else {
            commentButton.textContent = 'View Comments'
            for (let i = 0; i < elements.length; i++){
                elements[i].style.display = 'block'
            }
            commentArea.style.display = 'none'
        }
    }
}