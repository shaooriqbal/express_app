const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const fileSchema = new Schema({

    fileName: {
        type: String,
        required: true
    },
    size: Number,
    mime: String
    
}, { timestamps: true });

const File = mongoose.model('File', fileSchema);
module.exports = File;