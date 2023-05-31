const express = require('express');
const controller = require('../controllers/userController');
const router = express.Router();
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads'); // Set the destination folder where files will be saved
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname); // Set the filename to be the same as the original filename
    }
});
const upload = multer({ storage: storage });


//get all users
router.get('/allUsers', controller.getAllUsers);

//get single user
router.get('/aUser', controller.getSingleUser);

//delete single user
router.delete('/deleteAuser/:id', controller.deleteSingleUser);

//post
router.post('/createUser', controller.createUser);

//put
router.put('/updateUser/:id', controller.updateUser);

//single file upload
router.post('/uploadProfile', upload.single('profile'), controller.uploadProfile);

//getting all files
router.get('/getAllFiles', controller.getAllFiles);

module.exports = router;
