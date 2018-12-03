require('./config/config.js')

const _ = require("lodash");
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {toDo} = require('./models/todo');
var {user} = require('./models/user');

var app = express();
const port = process.env.PORT;

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

app.get('/todos', (req, res) => {
    toDo.find().then((todos) => {
        res.send({todos})
    }, (e) => {
        res.status(400).send(e);
    });
});

app.get("/todos/:id", (req, res) => {
    var id = req.params.id;
    if (!ObjectID.isValid(id)) {
        res.status(404).send("Invalid ID")
    }else{
        toDo.findById(id).then((todo) => {
            if (todo) {
                res.send(todo);
            }else{
                res.status(400).send();
            }
        }, (e) => {
            res.status(400).send();
        })
    }
    
});

app.delete('/todos/:id', (req, res) => {
    //get the id
    var id = req.params.id;
 
    //validate the id and return 404
    if (!ObjectID.isValid(id)) {
        res.status(404).send("Invalid ID");
    }else{
        toDo.findByIdAndDelete(id).then((todo) => {
            if (todo) {
                res.send(todo);
            }else{
                res.status(400).send();
            }
                
        }, (err) => {
            res.status(400).send();
        });
    }
    //remove todo by id
        //success
            //if no doc, send 404
            //if doc send doc with 200
        //error
            //400 with empty body
});

app.patch("/todos/:id", (req, res) => {
    var id = req.params.id;
    var body = _.pick(req.body, ['text', 'completed']);
    if(!ObjectID.isValid(id)) {
        return res.status(404).send("Invalid ID");
    }
    if (body.completed && _.isBoolean(body.completed)) {
        body.completedAt = new Date().getTime();
    }else{
        body.completed = false;
        body.completedAt = null;
     }
     toDo.findByIdAndUpdate(id, {
         $set: body
     }, {
         new: true
     }).then((todo) => {
         if (todo) {
            return res.send({todo});
         }else{
             return res.status(404).send();
         }
    }, (err) => {
        return res.status(404).send();
    }).catch((e) => {
        res.status(400).send();
    });
})

app.listen(port, () => {
    console.log(`App is listening to port ${port}`);
});


module.exports = {app};