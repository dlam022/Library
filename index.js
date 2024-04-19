function handleSubmit() {
    // const bookstring = inputBook.value.toString();
    if(inputBook.value.trim() === '' || inputAuthor.value.trim() === '' || inputPages.value.trim() === '') {
        alert("Please leave no blanks");
        return false;
    }
    return true;
}



function Book(name, author, pages, read) {
    //the constructor..
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.read = read;
    
    this.info = function() {
        let readStatus = this.read ? "read" : "not read yet"
        return this.name + ", " + this.author + ", " + this.pages + ", " + readStatus;
    }
}



function addBookToLibrary(book) {
    myLibrary.push(book);
    console.log(myLibrary);
    loadBooks(myLibrary);
}   

function loadBooks(books) {
    const container = document.querySelector('.book-container');
    container.innerHTML = '';
    books.forEach((book, index) => {
        const innerContainer = document.createElement('div');
        innerContainer.classList.add('in-container');
        const btnContainer = document.createElement('div');
        btnContainer.classList.add('btn-container')
        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('delete-book');
        deleteBtn.dataset.id = index; //use index to number the object in array and then use it to delete
        const iconBtn = document.createElement('i');
        iconBtn.classList.add('fa-regular', 'fa-circle-xmark', 'fa-lg');
        deleteBtn.appendChild(iconBtn);
        btnContainer.appendChild(deleteBtn);

        deleteBtn.addEventListener('click', () => {
            deleteBook(index); //take in the object index number
        });



        const title = document.createElement('h3');
        title.textContent = book.name;

        const author = document.createElement('p');
        author.textContent = `Author: ${book.author}`;


        const pages = document.createElement('p');
        pages.textContent = `Pages: ${book.pages}`;


        const readStat = document.createElement('p');
        readStat.classList.add('read-stat');
        readStat.addEventListener('click', () => {
            readStat.textContent = '';
            if(!book.read) {
                readStat.textContent = 'Read'
                readStat.style.color = 'green'
                book.read = true;
            }
            else {
                readStat.textContent = 'Not Read Yet'
                readStat.style.color = 'red'
                book.read = false;
            }

        });
        readStat.addEventListener('mouseenter', () => {
            readStat.textContent = '';
            if(!book.read) {
                readStat.textContent = 'Done Reading?'
                readStat.style.color = 'green'
            }
            else {
                readStat.textContent = 'Read Again?'
                readStat.style.color = 'red'
            }
        })

        readStat.addEventListener('mouseleave', () => {
            readStat.textContent = '';
            if(!book.read) {
                readStat.textContent = 'Not Read Yet'
                readStat.style.color = 'red'
            }
            else {
                readStat.textContent = 'Read'
                readStat.style.color = 'green'
            }
        })
        if(!book.read) {
            readStat.textContent = 'Not Read Yet';
            readStat.style.color = 'red';
        }
        else {
            readStat.textContent = 'Read';
            readStat.style.color = 'green';
        }




        innerContainer.appendChild(btnContainer);
        innerContainer.appendChild(title);
        innerContainer.appendChild(author);
        innerContainer.appendChild(pages);
        innerContainer.appendChild(readStat);

        container.appendChild(innerContainer);
        
        
    })

    
}

function deleteBook(index) {
    myLibrary.splice(index, 1); //use the index number of which button was click and delete
    loadBooks(myLibrary);
}


let myLibrary = [];
const test1 = new Book('Percy Jackson', 'Rick Riordan', 500, true);
const test2 = new Book('The Sea Monster', 'Rick Riordan', 450, false);
const addBtn = document.querySelector('#add');
const submitBtn = document.getElementById('submitBtn');
const container = document.querySelector('.container');
const form = document.querySelector('#myDialog');
const closeDialog = document.querySelector('#close');
const inputBook = document.getElementById('bname');
const inputAuthor = document.getElementById('author');
const inputPages = document.getElementById('pages')
const inputRead = document.getElementById('readStatus');
const formReset = document.getElementById('formHere');



addBtn.onclick = function() {
    form.showModal();
    formReset.reset();
}

closeDialog.onclick = function() {
    form.close();
}

form.addEventListener('submit', (event) => {
    if(!handleSubmit()) {
        event.preventDefault();
    }
    else{
        var boolRead = false;
        console.log(inputRead.value);

        if(inputRead.checked) {
            console.log("checkbox is checked");
            boolRead = true;
        }

        else{
            console.log("checkbox is not checked");
            boolRead = false;
        }

        console.log(boolRead);

        const test3 = new Book(inputBook.value, inputAuthor.value, inputPages.value, boolRead);
        addBookToLibrary(test3);
    }
})

