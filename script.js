let table = document.querySelector(".books-table");
let form = document.querySelector(".book-form");
let author = document.querySelector("#author");
let title = document.querySelector("#title");
let pages = document.querySelector("#pages");
const myLibrary = [];

function Book(author, title, pages, read) {
    this.author = author || "no author";
    this.title = title || "no title";
    this.pages = pages || "0";
    this.read = read || "no"
}

function addBookToLibrary(book) {
    myLibrary.push(book);
}

let book2 = new Book("kale", "Spanish 101", 300, "yes");
let book3 = new Book("Tom", "How to Bike 101", 10, "no");

addBookToLibrary(book1);
addBookToLibrary(book2);
addBookToLibrary(book3);

function showBooks() {
    myLibrary.forEach(addBookTable);
}

form.addEventListener("submit", (event) => {
    event.preventDefault();
    let read = document.querySelector("input[name=read]:checked");
    let book = new Book(author.value, title.value, pages.value, read.value);
    addBookToLibrary(book);
    addBookTable(book);
    form.reset();
});

function addBookTable(book) {
    let tbody = table.querySelector("tbody")
    let newRow = tbody.insertRow(-1);
    let cellOne = newRow.insertCell(-1);
    let bookIndex = document.createTextNode(myLibrary.indexOf(book) + 1);
    cellOne.appendChild(bookIndex);

    for (const property in book) {
        let newCell = newRow.insertCell(-1);
        let text = document.createTextNode(book[property]);
        newCell.appendChild(text);
    }

    let btnDelete = document.createElement("button");
    btnDelete.innerHTML = "Delete";

    let btnRead = document.createElement("button");
    btnRead.innerHTML = "Change Read Status";

    newRow.insertCell(-1).appendChild(btnDelete);
    //newRow.insertCell(-1).appendChild(btnDelete);
    btnDelete.addEventListener("click", (event) => {
        myLibrary.splice(bookIndex - 1, 1);
        tbody.innerHTML = "";
        showBooks();
    });

    newRow.insertCell(-1).appendChild(btnRead);
    //newRow.insertCell(-1).appendChild(btnRead);

    btnRead.addEventListener("click", (event) => {
        let index = Number(bookIndex.nodeValue) - 1;
        let readStatus = myLibrary[index].read;
        if (readStatus === "yes")
            myLibrary[index].read = "no";
        else
            myLibrary[index].read = "yes";

        tbody.innerHTML = "";
        showBooks();

    });
}

showBooks();
