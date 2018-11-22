var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/TodoApp');

// var toDo = mongoose.model('Todo', {
//     text: {
//         type: String,
//         required: true,
//         minlength: 1,
//         trim: true
//     },
//     completed: {
//         type: Boolean,
//         default: false
//     },
//     completedAt: {
//         type: Number,
//         default: null
//     }
// });

// var newTodo = new toDo({
//     text: 'Cook dinner'
// });

// var newTodo = new toDo({
//     text: 'Cook lunch',
//     completed: true,
//     completedAt: 12345
// });

// newTodo.save().then((doc) => {
//     console.log(doc);
// }, (err) => {
//     console.log('Unable to save todo');
// })

var user = mongoose.model('User', {
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 1
    }
});

var newUser = new user({
    email: 'srinig9@gmail.com'
});

newUser.save().then((doc) => {
    console.log(doc);
}, (err) => {
    console.log('Unable to save the user', err)
});