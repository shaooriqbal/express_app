const express = require('express');
const { connectToDb, getDb } = require('./db');
const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const localRoutes = require('./routes/localDbRoutes');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(userRoutes);
app.use(localRoutes);
let db;

//mongoose connection
const dbUri = 'your db url';
mongoose.connect(dbUri).then(() => app.listen(3000, () => {
    console.log('Express server started...');
})).catch((err) => Console.log(err));


// db connection
// connectToDb((error) => {
//     if (!error) {
//         db = getDb();
//     }
// });

