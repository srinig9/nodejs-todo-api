const MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
        return console.log('Unable to connect to database...');
    }

    console.log('Connected to DB successfully...');

    // db.collection('Todos').insertOne({
    //     text: 'Something todo',
    //     completed: false
    // }, (err, result) => {
    //     if (err) {
    //         return console.log('Error inserting document', err);
    //     }
    //     console.log(JSON.stringify(result.ops, undefined, 2))
    // });

    db.collection('Users').insertOne({
        name: 'Roshit',
        age: 12,
        location: 'Bangalore'
    }, (err, result) => {
        if(err) {
            return console.log('Error inserting document', err);
        }

        console.log(JSON.stringify(result.ops, undefined, 2));
    })

    db.close();

});