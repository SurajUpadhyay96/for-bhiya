var express = require('express'); // call express
var app = express(); // define our app using express
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

app.use(express.static(__dirname+'/client'));
app.use(bodyParser.json());

Genre = require('./models/genre');
Book = require('./models/book');

//connect to Mongoose
mongoose.connect('mongodb://localhost/bookstore');
var db = mongoose.connection;


app.get('/api/genres', function (req, res) {
    Genre.getGenres(function (err, genres) {
        if (err) {
            throw err;
        }
        res.json(genres);
    });
});

app.post('/api/genres', function (req, res) {
    var genre = req.body;
    Genre.addGenres(genre, function (err, genre) {
        if (err) {
            throw err;
        }
        res.json(genre);
    });
});
app.post('/api/books', function (req, res) {
    var book = req.body;
    Book.addBooks(book, function (err, book) {
        if (err) {
            throw err;
        }
        res.json(book);
    });
});
app.get('/api/books', function (req, res) {
    Book.getBooks(function (err, books) {
        if (err) {
            throw err;
        }
        res.json(books);
    });
});
app.get('/api/books/:_id', function (req, res) {
    Book.getBookById(req.params._id, function (err, book) {
        if (err) {
            throw err;
        }
        res.json(book);
    });
});

app.get('/', function (req, res) {
    
    res.send('Please use /api/books or /api/genres');
});

app.listen(3000);
console.log("server started...");
