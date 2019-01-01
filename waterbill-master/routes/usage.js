const express = require('express');
const router = express.Router();

const Items = require('../models/water_usage');

router.post('/put',(req,res) => {
  const { body }=req;
  console.log('servr_body_is',body);

  const newItem= new Items({
    id : req.body.cid,

  });
  newItem.save().then(items => res.json(items));
});

module.exports = router;
