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
router.get('/bucketlists', (req, res, next) => {
    const username = req.user.username;
    //get bucketlist by inputed value
    if(req.query.q){
        const bucketlistName = req.query.q;
        bucketlist.getBucketlistByInputName(username, bucketlistName, (err, bucketLists) => {
            if (err) { console.error(err); }
            else { res.send(bucketLists); }
        });
    }

    else{bucketlist.getAllBucketlists(username, (err, bucketLists) => {
        if (err) {
            console.error(err);
        }
        if (bucketLists.length <= 0) {
            res.send(req.user.name + ', Sorry you dont have a bucketList yet. Please create one!');
        }
        else {
            res.send(bucketLists);
        }
    })}
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
router.post('/bucketlists', (req, res, next) => {
    let newBucketlist = new bucketlist({
        name: req.body.name,
        created_by: req.user.username
    });
    bucketlist.createBucketlist(newBucketlist, (err, list) => {
        if (err) {
            console.error(err);
        }
        else {
            res.send('New BucketList ' + list.name + ' was Successfully created')
            //res.redirect()
        }
    });
});

router.put('/bucketlists/:bucketId/items/', (req, res, next) => {
    const newItem = {
        name: req.body.name,
        done: req.body.done
    };
    const bucketlistId = req.body.bucketlistId;

    bucketlist.addBucketlistItem(bucketlistId, newItem, (err, result) => {
        if (err) { console.error(err); }
        else { res.send(result); }
    })
})

// route for deleting a single bucketlist by its Id
router.delete('/bucketlists/:bucketlistId', (req, res, next) => {
    const bucketlistId = req.params.bucketlistId;
    bucketlist.deleteBucketlistById(bucketlistId, (err, result) => {
        if (err) { console.error(err); }
        else { res.send(result) }
    });
});

router.get('/bucketlists/:bucketlistId', (req, res, next) => {
    const bucketlistId = req.params.bucketlistId;
    console.log(bucketlistId);
    bucketlist.getSingleBucketlistById(req.user.username, bucketlistId, (err, result) => {
        if (err) { console.error(err); }
        else { res.send(result) }
    })
})

module.exports = router;
