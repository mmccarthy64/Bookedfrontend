class Comment {
    constructor(content, book_id, user_id){
        this.content = content;
        this.book = book_id
        this.user = user_id
    }

    static fetchComments = (book) => {
        console.log(book)
        // let comments
        fetch(`http://localhost:3000/books/${book}/comments`)
            .then(response => response.json())
            .then(comments => comments.forEach(comment => {
                if (comment.book_id === book){
                    comment = new Comment(comment.content, comment.book_id, comment.user_id)
                    Comment.renderComments(comment)
                }
            }))
            // console.log(comment)
            // renderComments(book, comments)
    }

    static renderComments(comment) {
        console.log(comment)
        let bookCard = document.getElementById(book)
        // let commentArea = document.createElement('div')
        // bookCard.append(commentArea)
        // let ul = document.createElement('ul')
        // commentArea.append(ul)
        // console.log(comments.length)
        // for(let i =0; i < comments.length; i++){
        //     console.log(comments)
        // }
    }
}