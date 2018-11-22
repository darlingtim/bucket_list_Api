
const express = require('express');
const mongoose = require('mongoose');
const bucketlist = require('../model/bucketlists');
const router = express.Router();

//Route to view all created Bucketlist by a given user
router.get('', (req, res,next) =>{
    const username = req.user.username;
    bucketlist.getAllBucketlists(username, (err, bucketLists)=>{
        if(err){
            console.error(err);
        }
        if(bucketLists.length <= 0 ){
            res.send(req.user.name + ', Sorry you dont have a bucketList yet. Please create one!');
        }
        else{
            res.send(bucketLists);
        }
    })
});

//Route to search bucketlist by inputed name
router.get('/?q', (req, res, next)=>{
    const bucketlistName = req.params.q;
    const username = req.user.username;
    bucketlist.getBucketlistByInputName(username, bucketlistName, (err, bucketLists)=>{
        if(err){console.error(err);}
        else{res.send(bucketLists);}
    });
});

// Route to create bucketLists
router.post('/', (req, res, next)=>{
    let newBucketlist = new bucketlist({
        name :req.body.name,
        created_by: req.user.username
    });
    bucketlist.createBucketlist(newBucketlist, (err, list)=>{
        if(err){
            console.error(err);
        }
        else{
            res.send('New BucketList '+list.name +' was Successfully created')
           //res.redirect()
        }
    });
});

router.put('/:bucketId/items/', (req, res, next)=>{
    const newItem= {
        name: req.body.name,
        done: req.body.done
    };
    const bucketlistId = req.body.bucketlistId;

    bucketlist.addBucketlistItem(bucketlistId, newItem, (err, result)=>{
        if(err){console.error(err);}
        else{res.send(result);}
    })
})

// route for deleting a single bucketlist by its Id
router.delete('/:bucketlistId', (req, res, next)=>{
    const bucketlistId = req.params.bucketlistId;
    bucketlist.deleteBucketlistById(bucketlistId, (err, result)=>{
        if (err){console.error(err);}
        else{res.send(result)}
    });
});




module.exports = router;