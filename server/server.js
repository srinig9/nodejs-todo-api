require('./config/config.js')

const _ = require("lodash");
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');
const bcrypt = require('bcryptjs');

var {mongoose} = require('./db/mongoose');
var {toDo} = require('./models/todo');
var {user} = require('./models/user');
var {authenticate} = require('./middleware/authenticate')

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
});

app.post('/users', (req, res) => {
    var body = _.pick(req.body, ['email', 'password']);
    console.log(body);
    var oUser = new user(body);

    oUser.save().then(() => {
        return oUser.generateAuthToken();
        //res.send(user);
    }).then((token) => {
        res.header('x-auth', token).send(oUser);
    }).catch((e) => {
        res.status(400).send(e);
    });
});

// POST /users/login {email, password}
app.post('/users/login', (req, res) => {
    var body = _.pick(req.body, ['email', 'password']);
  
    user.findByCredentials(body.email, body.password).then((userInst) => {
        //res.send(userInst);
        return userInst.generateAuthToken().then((token) => {
            res.header('x-auth', token).send(userInst);
        });
    }).catch((e) => {
        res.status(400).send();
    });

    // user.find({
    //     email: body.email
    // }).then((userInsts) => {
    //     console.log(userInsts[0]);
    //     bcrypt.compare(body.password, userInsts[0].password, (err, bcryptRes) => {
    //         console.log(userInsts[0].password);
    //         if (err) {
    //             return res.status(400).send('Error occured in comparing password', err);
    //         }

    //         if (bcryptRes) {
    //             res.status(200).send(userInsts[0]);
    //         }else{
    //             res.status(401).send('User not found');
    //         }
    //     });
    //  });
});

app.listen(port, () => {
    console.log(`App is listening to port ${port}`);
});

app.get('/users/me', authenticate, (req, res) => {
    res.send(req.user);
});

module.exports = {app};