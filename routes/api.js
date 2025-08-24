const express = require('express');
const router = express.Router();
const bucketlist = require('../model/bucketlists');


// Register route
/*router.get('/register', (req, res, next) => {
    res.send('REGISTER');
}); */

// Authenticate
router.post('/authenticate', (req, res, next) => {
    res.send('AUTHENTICATE');
});

// Profile route
router.get('/profile', (req, res, next) => {
    res.send('PROFILE');
});

// Validate
router.get('/validate', (req, res, next) => {
    res.send('VALIDATE');
});

module.exports = router;
//const express = require('express');
//const router = express.Router();

// Register route
router.get('/register', (req, res, next) => {
    res.send('REGISTER');
});

// Authenticate
router.post('/authenticate', (req, res, next) => {
    res.send('AUTHENTICATE');
});

// Profile route
router.get('/profile', (req, res, next) => {
    res.send('PROFILE');
});

// Validate
router.get('/validate', (req, res, next) => {
    res.send('VALIDATE');
});


//Route to view all created Bucketlist by a given user and search by inputed value
router.get('/bucketlists', (req, res) => {
    if (req.query.q) {
        bucketlist.getBucketlistByInputName(req.user.username, req.query.q, (err, result) => {
            if (err) {
                console.error(err);
                return;
            }
            res.send(result);
        });
    } else {
        bucketlist.getAllBucketlists(req.user.username, (err, result) => {
            if (err) {
                console.error(err);
                return;
            }
            res.send(result);
        });
    }
});


//Route to search bucketlist by inputed name
/*router.get('/bucketlists', (req, res, next) => {
    console.log(req.params.q)
    const bucketlistName = req.params.q;
    const username = req.user.username;
    bucketlist.getBucketlistByInputName(username, bucketlistName, (err, bucketLists) => {
        if (err) { console.error(err); }
        else { res.send(bucketLists); }
    });
});*/

// Route to create bucketLists
router.post('/bucketlists', (req, res) => {
    bucketlist.createBucketlist(req.body, (err, result) => {
        if (err) {
            console.error(err);
            return;
        }
        res.send(result);
    });
});

router.put('/bucketlists/:bucketId/items/', (req, res) => {
    bucketlist.addBucketlistItem(req.body.bucketlistId, req.body, (err, result) => {
        if (err) {
            console.error(err);
            return;
        }
        res.send(result);
    });
})

// route for deleting a single bucketlist by its Id
router.delete('/bucketlists/:bucketlistId', (req, res) => {
    bucketlist.deleteBucketlistById(req.params.bucketlistId, (err, result) => {
        if (err) {
            console.error(err);
            return;
        }
        res.send(result);
    });
});

router.get('/bucketlists/:bucketlistId', (req, res) => {
    bucketlist.getSingleBucketlistById(req.user.username, req.params.bucketlistId, (err, result) => {
        if (err) { console.error(err); }
        else { res.send(result) }
    })
})

module.exports = router;
