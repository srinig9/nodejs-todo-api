const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
        return console.log('Unable to connect to database...');
    }

    console.log('Connected to DB successfully...');

    // db.collection('Todos').find({completed: false}).toArray().then((docs) => {
    //     console.log(JSON.stringify(docs, undefined, 2));
    // }, (err) => {
    //     console.log('Error Retrienving', err);
    // })
  
    // db.collection('Todos').find({
    //     _id: new ObjectID('5bf5724acccff40a640cc55f')
    // }).toArray().then((docs) => {
    //     console.log(JSON.stringify(docs, undefined, 2));
    // }, (err) => {
    //     console.log('Error Retrienving', err);
    // });

    db.collection('Users').find({name: 'Roshit'}).count().then((count) => {
        console.log(`Todo count: ${count}`);
    }, (err) => {
        console.log('Error Retrienving', err);
    });

    //db.close();

});