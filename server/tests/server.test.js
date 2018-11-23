const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server');
const {toDo} = require('./../models/todo');

beforeEach((done) => {
    toDo.remove({}).then(() => done());
})

describe('POST /todos', () => {
    it('Should create a new todo', (done) => {
        var text = 'Mocha Test todo text';

        request(app)
            .post('/todos')
            .send({text})
            .expect(200)
            .expect((res) => {
                console.log(`Response Text: ${res.body.text}`)
                expect(res.body.text).toBe(text);
            })
            .end((err, res) => {
                if(err) {
                    return done(err);
                }

                toDo.find().then((todos) => {
                    console.log(`Length: ${todos.length}`);
                    expect(todos.length).toBe(1);
                    console.log(`Length: ${text}`);
                    expect(todos[0].text).toBe(text);
                    done();
                }).catch((e) => done(e));
            });
    });

    it('should not create todo with invalid data', (done) => {
        var text = '2 Mocha Test todo text';

        request(app)
            .post('/todos')
            .send({})
            .expect(400)
            // .expect((res) => {
            //     console.log(`Response Text: ${res.body.text}`)
            //     expect(res.body.text).toBe(text);
            // })
            .end((err, res) => {
                if(err) {
                    return done(err);
                }
                toDo.find().then((todos) => {
                    expect(todos.length).toBe(0);
                    done();
                }).catch((e) => done(e));
                
            });
    });
});