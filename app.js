const express = require('express');
const { connectToDb, getDb } = require('./db');
const { ObjectId } = require('mongodb');

const app = express();
app.use(express.json());
let db;

// db connection
connectToDb((error) => {
    if (!error) {
        app.listen(3000, () => {
            console.log('Express server started...');
        });
        db = getDb();
    }
});

//get all cakes
app.get('/cakes', (req, res) => {
    const page = req.query.p || 0;
    const limit = 5;
    let cakes = [];
    db.collection('cakes').find().skip(page * limit).limit(limit).forEach(cake =>
        cakes.push(cake)
    ).then(() => {
        res.status(200).json(cakes);
    }).catch(() => {
        res.status(500).json({ error: "Fetching error" })
    })

});

// get single cake
app.get('/cakes/:id', (req, res) => {
    let id = req.params.id;
    if (ObjectId.isValid(id)) {
        db.collection('cakes').findOne({ _id: new ObjectId(id) }).then(doc => {
            res.status(200).json(doc);
        }).catch(err => { res.status(500).json(err) });
    } else {
        res.status(500).json({ error: "Id given is not valid" });
    }
});

// post request

app.post('/cakes', (req, res) => {
    const cake = req.body;

    db.collection('cakes').insertOne(cake).then(result => {
        res.status(201).json(result)
    }).catch(err => {
        console.log(err);
        res.status(500).json(err)
    });
});

//Delete request

app.delete('/cakes/:id', (req, res) => {
    let id = req.params.id;
    if (ObjectId.isValid(id)) {
        db.collection('cakes').deleteOne({ _id: new ObjectId(id) }).then(result => {
            res.status(200).json(result)
        }).catch(err => {
            console.log(err);
            res.status(500).json(err)
        });
    } else {
        res.status(500).json({ error: "Id given is not valid" });
    }
});

// update request

app.patch('/cakes/:id', (req, res) => {
    const updates = req.body;
    let id = req.params.id;
    if (ObjectId.isValid(id)) {
        db.collection('cakes').updateOne({ _id: new ObjectId(id) }, { $set: updates }).then(result => {
            res.status(200).json(result)
        }).catch(err => {
            console.log(err);
            res.status(500).json(err)
        });
    } else {
        res.status(500).json({ error: "Id given is not valid" });
    }
});

