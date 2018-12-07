var mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

var UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        unique: true,
        validate: {
            validator: (value)=>{
                return validator.isEmail(value);
            }, //This function can be writter as validator.isEmail
            message: '{VALUE} is not a valid email'
        }
    },
    password: {
        type: String,
        require: true,
        minlength: 6
    },
    tokens: [{
        acees: {
            type: String,
            require: true
        },
        token: {
            type: String,
            require: true
        }
    }]
});

//Override toJSON method
UserSchema.methods.toJSON = function() {
    var userInst = this;
    var userInstObj = userInst.toObject();

    return _.pick(userInstObj, ['_id', 'email']);
};

UserSchema.methods.generateAuthToken = function() {
    var userInst = this;
    var access = 'auth';
    var token = jwt.sign({_id: userInst._id.toHexString(), access}, 'abc123').toString();
    console.log('Token', token);
    userInst.tokens.push({access, token});

    return userInst.save().then(() => {
        console.log('Saving Token', token);
        return token;
    });
};

var user = mongoose.model('User', UserSchema);

module.exports = {user};