const express = require('express');
const router = express.Router();

//get all cakes
router.get('/cakes', (req, res) => {
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
router.get('/cakes/:id', (req, res) => {
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

router.post('/cakes', (req, res) => {
    const cake = req.body;

    db.collection('cakes').insertOne(cake).then(result => {
        res.status(201).json(result)
    }).catch(err => {
        console.log(err);
        res.status(500).json(err)
    });
});

//Delete request

router.delete('/cakes/:id', (req, res) => {
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

router.patch('/cakes/:id', (req, res) => {
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
module.exports = router;