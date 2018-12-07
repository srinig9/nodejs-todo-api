var {user} = require('./../models/user');


var authenticate = (req, res, next) => {
    var token = req.header('x-auth');

    console.log('Token', token),
    user.findByToken(token).then((userInst) => {
        console.log('User Returned', userInst);
        if (!userInst) {
            return Promise.reject();
        }

        req.user = userInst;
        req.token = token;
        next();
    }).catch((e) => {
        res.status(401).send();
    });
};

module.exports={authenticate};