var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');
var {toDo} = require('./models/todo');
var {user} = require('./models/user');

var app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
    console.log(req.body.text);
    var newToDo = new toDo({
        text: req.body.text
    });

    newToDo.save().then((doc) => {
        console.log(doc);
        res.send(doc);
    }, (err) => {
        res.status(400).send(err);
    });
});

app.listen(3000, () => {
    console.log(`App is listening to port 3000`);
});


module.exports = {app};