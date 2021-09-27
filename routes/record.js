const express = require("express");

// recordRoutes is an instance of the express router and I use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;
const recordRoutes = express.Router();
const dbo = require("../db/dbconn");

//Get a list of all records
recordRoutes.route("/record").get(function(req, res){
    let db_connect = dbo.getDb("paints");
    db_connect
        .collection("records")
        .find({})
        .toArray(function(err, result){
            if (err) throw err;
            res.json(result);
        });
});

//Get a record by id
recordRoutes.route("/record/:id").get(function(req,res){
    let db_connect = dbo.getDb("paints");
      let myquery = { _id: ObjectId( req.params.id )};
    db_connect
        .collection("records")
        .findOne(myquery, function (err, result) {
            if (err) throw err;
            res.json(result);
        });
});

//Create a new record
recordRoutes.route("/record/:add").post(function(req, res){
    let db_connect = dbo.getDb("paints");
    let myobj = {
        paint_img: req.body.paint_img,
        paint_author: req.body.paint_author,
        paint_price: req.body.paint_price,
        paint_contact: req.body.paint_contact,
    };
    db_connect.collection("records").insertOne(myobj, function (err, res) {
        if (err) throw err;
      });
});

// This section will help you update a record by id.
recordRoutes.route("/update/:id").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId( req.params.id)};
  let newvalues = {
    $set: {
      paint_img: req.body.paint_img,
      paint_author: req.body.paint_author,
      paint_price: req.body.paint_price,
      paint_contact: req.body.paint_contact,
    },
  };
  db_connect
    .collection("records")
    .updateOne(myquery, newvalues, function (err, res) {
      if (err) throw err;
      console.log("1 document updated");
      response.json(res);
    });
});
// This section will help you delete a record
recordRoutes.route("/:id").delete((req, response) => {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId( req.params.id )};
  db_connect.collection("records").deleteOne(myquery, function (err, obj) {
    if (err) throw err;
    console.log("1 document deleted");
    response.status(obj);
  });
});

  
  module.exports = recordRoutes;