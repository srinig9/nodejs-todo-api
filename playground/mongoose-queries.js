const {mongoose} = require('./../server/db/mongoose');
const {toDo} = require('./../server/models/todo');
const {user} = require("./../server/models/user");


var id = "5bfb984c85ff261f6d5cf545";

// toDo.find({
//     _id: id
// }).then((todos) => {
//     console.log('Todos', todos);
// });

// toDo.findOne({
//     _id: id
// }).then((todo) => {
//     console.log('Todo', todo);
// });

user.findById("6bf6607028002311726598ef").then((user) => {
    if(!user) {
        return console.log("User not found");
    }
    console.log(user);
}, (e) => {
    console.log("Error calling findById method", e);
})