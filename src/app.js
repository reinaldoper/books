const express = require('express');

const userBookController = require('./controllers/userBook.controller');


const app = express();

app.use(express.json());
app.post('/userbooks', userBookController.insertUserBook);
app.get('/users/:id', userBookController.getUserId);
app.get('/users', userBookController.getAllUser);
app.post('/users', userBookController.insertUser);
app.get('/books/search', userBookController.getSearch);
app.get('/books/:id', userBookController.getBookId);
app.get('/bookusers/:id', userBookController.getBooksUsersById);
app.get('/userbooks/:id', userBookController.getUsersBooksById);
app.get('/books', userBookController.getAll);

module.exports = app;

