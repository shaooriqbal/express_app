const express = require('express');
const controller = require('../controllers/userController');
const router = express.Router();
const multer = require('multer');
const auth = require('../middlewares/auth');
const { registerValidator, loginValidator } = require('../validators/userValidators');


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
router.get('/allUsers', auth, controller.getAllUsers);

//get single user
router.get('/aUser/:id', auth, controller.getSingleUser);

//delete single user
router.delete('/deleteAuser/:id', auth, controller.deleteSingleUser);

//post
router.post('/createUser', auth, controller.createUser);

//put
router.put('/updateUser/:id', auth, controller.updateUser);

//single file upload
router.post('/uploadProfile', auth, upload.single('profile'), controller.uploadProfile);

//getting all files
router.get('/allFiles', auth, controller.getAllFiles);

//user registeration
router.post('/register', registerValidator, controller.register);

//user registeration
router.post('/login', loginValidator, controller.login);

router.post('/userRight', auth, controller.creatUserRight);

router.get('/getRights', auth, controller.getUsersRight);
module.exports = router;
