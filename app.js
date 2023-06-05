const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const localRoutes = require('./routes/localDbRoutes');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(userRoutes);
app.use(localRoutes);
app.use(cors());

//mongoose connection
mongoose
    .connect("mongodb+srv://itshaoor:shaoorshah@cluster0.antouad.mongodb.net/?retryWrites=true&w=majority", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(3000, () => {
            console.log('Express server started...');
        });
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });
