class Book {
    constructor(title, author, isbn){
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

class UI {
    addBookToList(book){
        const list = document.getElementById(`book-list`);

        //create tr element
        const row = document.createElement(`tr`);
        row.innerHTML = `<td>${book.title}</td>
                        <td>${book.author}</td>
                         <td>${book.isbn}</td>`;

    list.appendChild(row);
    }

    showAlert(message, className){
        const div = document.createElement(`div`);
        div.className = `alert ${className}`
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector(`.container`);
        const form = document.querySelector(`#book-form`);
        container.insertBefore(div, form);

        setTimeout(function(){
        document.querySelector(`.alert`).remove();
          }, 3000);
    }

    deleteBook(target){
        if(target.className === `delete`){
            target.parentElement.parentElement.remove();
        }
    }

    clearFields(){
        document.getElementById(`title`).value = ``;
        document.getElementById(`author`).value = ``;
        document.getElementById(`isbn`).value = ``;
    }
}

class Store {
    static getBooks(){
        let books;
        if(localStorage.getItem(`books`) === null)
             books = [];
             else
             books = JSON.parse(localStorage.getItem(`books`));

        return books;
        
    }
    
    static displayBooks(){
       const books = Store.getBooks();
       
       books.forEach(function(book){
           const ui = new UI;
           ui.addBookToList(book);
       });
    }

    static addBook(book){
        const books = Store.getBooks();
        books.push(book);
        localStorage.setItem(`books`, JSON.stringify(books));
    }

    static removeBook(isbn){
        const books = Store.getBooks();

        books.forEach(function(book, index){
            if(book.isbn === isbn){
                books.splice(index, 1);
            }

            localStorage.setItem(`books`, JSON.stringify(books));
        })
    }

}
//DOM Load Event
document.addEventListener(`DOMContentLoaded`, Store.displayBooks);

// Event Listener for Add Book 
document.getElementById(`book-form`).addEventListener(`submit`,
function(e){
    //Get form values
    const title = document.getElementById(`title`).value,
          author = document.getElementById(`author`).value,
          isbn = document.getElementById(`isbn`).value

    //Instantiate Book
    const book = new Book(title, author, isbn);
    //Instantiate UI
    const ui = new UI();

    //Validate
    if(title === `` || author === `` || isbn === ``){
        // Error alert
        ui.showAlert(`Please fill in all the fields`, `error`);
    } else {
        // Call the UI prototypes
        ui.addBookToList(book);
        Store.addBook(book);
        ui.showAlert(`Successfully Queued!`, `success`);
        ui.clearFields();
    }
    
    


    e.preventDefault();
});

//Event Listener for Delete
document.getElementById(`book-list`).addEventListener(`click`, function(e){
    const ui = new UI();

    ui.deleteBook(e.target);
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
    ui.showAlert(`Sucessfuly deleted`, `success`);

    e.preventDefault();
});

//Send Email
function sendEmail() {
	Email.send({
	Host: "smtp.gmail.com",
	Username : `106network@gmail.com`,
	Password : `21290104961166`,
	To : 'billy.orr@cus.ca',
	From : "106network@gmail.com",
	Subject : "This is a test email",
	Body : "<email body>",
	}).then(
		message => alert("mail sent successfully")
	);
}