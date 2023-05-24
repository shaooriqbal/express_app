const express = require('express');
const User = require('../models/user');
const router = express.Router();

//get all user

router.get('/users', (req, res) => {
    const user = User({
        name: 'shah',
        age: 22,
        gender: 'Male'
    });
    user.save().then((result) => {
        res.send(result);
    }).catch((err) => {
        console.log(err);
    });
});

//get all users
router.get('/allUsers', (req, res) => {
    User.find().
        then((result) => {
            res.send(result);
        }).catch((err) => {
            console.log(err);
        });
});

//get single user
router.get('/aUser', (req, res) => {
    User.findById('646da816dd52ebdfc3d9ef57').
        then((result) => {
            res.send(result);
        }).catch((err) => {
            console.log(err);
        });
});

//delete single user
router.delete('/deleteAuser/:id', (req, res) => {
    var id = req.params.id;
    User.findByIdAndDelete(id).
        then((result) => {
            res.send(result);
        }).catch((err) => {
            console.log(err);
        });
});

//post
router.post('/createUser', (req, res) => {

    const user = new User(req.body);
    user.save().then((result) => {
        res.send(result);
    }).catch((err) => {
        console.log(err);
    });
});

//put
router.put('/updateUser/:id', (req, res) => {
    const id = req.params.id;
    User.findByIdAndUpdate(id, req.body).then((result) => {
        res.send(result);
    }).catch((err) => {
        console.log(err);
    });
});
module.exports = router;