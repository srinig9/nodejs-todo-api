const {mongoose} = require('./../server/db/mongoose');
const {toDo} = require('./../server/models/todo');
const {user} = require("./../server/models/user");

const {ObjectID} = require('mongodb');


toDo.remove({}).then((result) => {
    console.log(results);
});

//toDo.findOneAndRemove
//toDo.findByIdAndRemove

