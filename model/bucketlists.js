
const mongoose = require('mongoose');
const config = require('../config/database');

// itemSchema
const itemSchema = mongoose.Schema({
    id: Number,
    name: { type: String, unique: true },
    timestamps: { type: Date},
    done: Boolean
});
itemSchema.set('timestamps', { createdAt: 'date_created', updatedAt: 'date_modified' })

//bucklist schema
const bucketlistSchema = mongoose.Schema({
    id: Number,
    name: {type:String, unique:true},
    items:[
        {itemSchema}
    ],
    timestamps: { type: Date },
    
    created_by: String 
});
bucketlistSchema.set('timestamps', {createdAt:'date_created', updatedAt:'date_modified'});

const bucketlist = module.exports = mongoose.model('bucketLists', bucketlistSchema);

//gets all the bucketlists created by a given user using their username
module.exports.getAllBucketlists = (username, callback)=>{
    const query = {created_by: username};
    bucketlist.find(query,{items: false}, callback);
}

//gets a single bucketlist of a user by its ID
module.exports.getSingleBucketlistById = (userName, bucketlist_Id, callback)=>{
    const query = {created_by:username, _id:bucketlist_Id}
    bucketlist.findOne(query, callback);
}

//filters bucketlists by name input on the fly
module.exports.getBucketlistByInputName = (username, nameInputed, callback )=>{
    const query = {created_by:username, name:{ $regex:`/${nameInputed}/`}};
    bucketlist.find(query, callback);

}

//adds new bucketlist to to the database
module.exports.createBucketlist = (newList, callback)=>{
    newList.save( callback);
}

module.exports.addBucketlistItem = (username, bucketlist_Id, addItem, callback)=>{
const query = {_id:bucketlist_Id, };
    //callback(bucketlist.create();
   // console.log(addItem)
    //console.log(bucketlist_Id)
    
    bucketlist.findById(bucketlist_Id).items[{addItem}].Save(callback)
}

//deletes one bucketlist by its Id 
module.exports.deleteBucketlistById = (bucketlist_Id, callback)=>{
    bucketlist.findByIdAndDelete(bucketlist_id, callback);
}