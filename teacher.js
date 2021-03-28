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
                         <td>${book.isbn}</td>
                        <td><a href = "#" class = "delete">Accept<a></td>`;

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
        ui.showAlert(`Please fill in all fields`, `error`);
    } else {
        // Call the UI prototypes
        ui.addBookToList(book);
        Store.addBook(book);
        ui.showAlert(`Book successfully added!`, `success`);
        ui.clearFields();
    }
    
    


    e.preventDefault();
});

function fieldsAreFilled() {
    let name = document.querySelector(`#title`).value;
    let email = document.querySelector(`#author`).value;

    if (name === "" || email === ""){
        return false;
    } else 
    return true;
}

//Event Listener for Delete
document.getElementById(`book-list`).addEventListener(`click`, function(e){
    const ui = new UI();

    if(fieldsAreFilled()) {

        ui.deleteBook(e.target);
        Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
    
        let subject = e.target.parentElement.previousElementSibling.textContent;
        let email = e.target.parentElement.previousElementSibling.previousElementSibling.textContent;
        let name = e.target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.textContent;

        let mentorName = document.querySelector(`#title`).value;
        let mentorEmail = document.querySelector(`#author`).value;
    
        sendEmailToStudent(email, name);
        sendEmailToMentor(mentorEmail, mentorName, email, name, subject);
    
        ui.showAlert(`A confirmation email was sent! Follow up with the student! `, `success`)
        e.preventDefault();
    } else {
        ui.showAlert(`Please fill in your Name and Email`, `error`)
    }
    
});

//Send Email
function sendEmailToStudent(email, name) {

	Email.send({
	Host: "smtp.gmail.com",
	Username : `notifier.edu.link@gmail.com`,
	Password : `notifier.edu.link@gmail.ca`,
	To : `${email}`,
	From : "notifier.edu.link@gmail.com",
	Subject : "You've Been Matched Up!",
	Body : `Hello ${name}!
    \n
    We thought we should let you know that you've been paired up with a mentor! 
    \n
    They will be in contact with you shortly! Keep a look out!`,
	}).then(
		//message => alert("A confirmation email was sent")
	);
}

function sendEmailToMentor(mentorEmail, mentorName, email, name, subject) {
	
    Email.send({
	Host: "smtp.gmail.com",
	Username : `notifier.edu.link@gmail.com`,
	Password : `notifier.edu.link@gmail.ca`,
	To : `${mentorEmail}`,
	From : "notifier.edu.link@gmail.com",
	Subject : "Here is your new student!",
	Body : `Hello ${mentorName}!
    \n
    We've just sent an email to ${name} to let them know you're willing to mentor them in ${subject}! 
    \n
    Contact them quickly at ${email}`,
	}).then(
		//message => alert("A confirmation email was sent")
	);
}