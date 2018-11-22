const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
        return console.log('Unable to connect to DB', err);
    }
    console.log('Connected to DB');

    // db.collection('Todos').findOneAndUpdate({
    //     _id: new ObjectID('5bf63db6cccff40a640cc56f')
    // }, {
    //     $set: {
    //         completed: false
    //     }
    // },{
    //     returnOriginal: false
    // }).then((result) => {
    //     console.log(result);
    // })

    db.collection('Users').findOneAndUpdate({
        _id: new ObjectID("5bf5675a664fb60f0fa8ba5e")
    }, {
        $set: {
            name: 'Roshit Srinivasan'
        },
        $inc: {age: 1}
    }, {
        returnOriginal: false
    }).then((result) => {
        console.log(result);
    });

});