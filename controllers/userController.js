const User = require('../models/user');
const File = require('../models/file');


const uploadProfile = async (req, res, next) => {
    try {
        const uploadedFile = req.file;
        console.log(uploadedFile);
        const { v4: uuidv4 } = require('uuid');
        const randomId = uuidv4();
        const file = new File({
            fileName: uploadedFile.filename,
            size: uploadedFile.size,
            mime: uploadedFile.mimetype
        });
        await file.save();
        res.json({
            message: 'File uploaded successfully',
            file: {
                filename: uploadedFile.filename,
                size: uploadedFile.size,
                mimetype: uploadedFile.mimetype
            }
        });
    } catch (err) {
        console.error('Error uploading file:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getAllUsers = async (req, res) => {
    await User.find().
        then((result) => {
            res.send(result);
        }).catch((err) => {
            console.log('--error--');
            console.log(err);
        });
};

const getSingleUser = async (req, res) => {
    await User.findById('646da816dd52ebdfc3d9ef57').
        then((result) => {
            res.send(result);
        }).catch((err) => {
            console.log(err);
        });
};

const deleteSingleUser = async (req, res) => {
    var id = req.params.id;
    await User.findByIdAndDelete(id).
        then((result) => {
            res.send(result);
        }).catch((err) => {
            console.log(err);
        });
};

const createUser = async (req, res) => {

    const user = new User(req.body);
    await user.save().then((result) => {
        res.send(result);
    }).catch((err) => {
        console.log(err);
    });
};

const updateUser = async (req, res) => {
    const id = req.params.id;
    await User.findByIdAndUpdate(id, req.body).then((result) => {
        res.send(result);
    }).catch((err) => {
        console.log(err);
    });
};

const getAllFiles = async (req, res) => {
    await File.find().then((result) => {
        res.send(result);
    }).catch((err) => {
        console.log(err);
    });
};
module.exports = {
    getSingleUser,
    getAllUsers,
    createUser,
    updateUser,
    deleteSingleUser,
    uploadProfile,
    getAllFiles
}