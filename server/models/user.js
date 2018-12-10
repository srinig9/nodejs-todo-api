const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const {ObjectID} = require('mongodb');
const bcrypt = require('bcryptjs');


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
        access: {
            type: String,
            require: true
        },
        token: {
            type: String,
            require: true
        }
    }]
});

UserSchema.pre('save', function(next) {
    var user = this;

    if (user.isModified('password')) {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
                user.password = hash;
                console.log('Hash', hash);
                next();
            });
        });
    }else{
        next();
    }
});

UserSchema.statics.findByToken = function(token) {
    var User = this;
    var decoded;
    try {
        decoded = jwt.verify(token, 'abc123');
    } catch (e) {
        // return new Promise((resolve, reject) => {
        //     reject();
        // });
        return Promise.reject(); //Use this code instead of above
    }
    var uId = new ObjectID(decoded._id);
 
    return User.findOne({
        'tokens.token': token,
        'tokens.access': 'auth',
        '_id': ObjectID(decoded._id)
    });
};

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
    console.log('Tokens', userInst.tokens);
    return userInst.save().then(() => {
        console.log('Saving User Token', userInst);
        return token;
    });
};

var user = mongoose.model('User', UserSchema);

module.exports = {user};