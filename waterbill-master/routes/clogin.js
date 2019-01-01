const express = require('express');
const router = express.Router();

const Items = require('../models/schema_for_cust_login');

router.post('/login',(req,res) => {

  /* Items.find()
     .then(items => res.json(items)) */
     Items.find({
       id: req.body.cid
     },(err,succuss)=> {
       if(err) {
         res.send({
          st: false,

          msg: 'InValid Cust_id'
        })
       }
       else if(succuss) {
         if(succuss.length!=1) {
           res.send({

            st: false,
            msg: 'InValid Cust_id'
          })
         }
         else {
            const user=succuss[0];
            console.log('servr_cust-id_is',user);
              console.log('servr_cust_user',user['id']);

             res.send({
              st: true,
              c_id: user['id'],
              msg: 'Valid Cust_id'
            })
            /*return res.end({
                suc: true,
                msg: 'SuccussFull Login'
            }); */
         }
       }
     })
});


router.post('/register',(req,res) => {
  const { body }=req;
  console.log('servr_+body_is',body);

  const newItem= new Items({
    id : req.body.cid
  });
  newItem.save((err, doc) => {
    if (err) {
      res.send({
       succuss: false,
       msg: 'Not saved'
     })
    } else {
      res.send({
       succuss: true,
       msg: 'saved to database'
     })
    }
  });
});

router.post('/deleteuser',(req,res) => {
  const { body }=req;
  console.log('servr_+body_is',body);

  Items.remove({id : req.body.cid},(err, succuss) => {
    if (err) {
      res.send({
       succuss: false,
       msg: 'Not deleted'
     })
    } else {

      res.send({
       succuss: true,
       msg: 'User Deleted'
     })
    }
  });
});

router.post('/fetchallusers',(req,res) => {
  const { body }=req;
  console.log('Users are +',body);

  Items.find({},{id:1},{_id:0},(err,succuss)=> {
    if(err) {
      res.send({
       st: false,

       msg: 'InValid Cust_id0'
     })
    }
    else if(succuss) {

        console.log('Succuss length is +',succuss.length);
      console.log('Succuss Users are +',succuss);

      if(succuss.length<=0) {
        res.send({
         st: false,
         msg: 'InValid Cust_id1'
       })
      }
      else {
         const user=succuss;
          res.send({
           st: true,
            users: user,
           msg: 'User exists'
         })
         /*return res.end({
             suc: true,
             msg: 'SuccussFull Login'
         }); */
      }
    }
  })

//  var userarray = Items.find({}, {_id:1}).map(function(item){ return item._id; }
});


router.get('/savewaterusage',(req,res) => {
  //res.set('Content-Type', 'text/html');
  const { body }=req;

  //console.log('---------------server_body_type',typeof body);
  //console.log('servr_+body_is',objdata);

  var uiamount=1;
  var uidate=new Date().toISOString().slice(0,10);
  var uiyear=new Date().toISOString().slice(0,4);
  var uimonth=new Date().toISOString().slice(5,7);
  var uiday=new Date().toISOString().slice(8,10);
  console.log("Dtae is"+uidate);
  console.log("Month is"+uimonth);
  console.log("Day is"+uiday);
  console.log("Day is"+uiyear);

   //var uiusebyday={$inc:{"amount":1}, date:uidate}

  /* Items.update(

  //  { id : req.body.cid },

    { $and: [ {"id": { $eq: req.body.cid }}, {"dailyusage.usebyday.date": { $eq: uidate}} ] },

    {
        'dailyusage': {year:uiyear,month:uimonth,usebyday:uiusebyday}
    },
    //{$inc:{'dailyusage.usebyday.amount':1}},
    //{upsert: true},
    { upsert: true },
    function (err, done) {
     if (err) {
       //console.error(err);
       res.send('sorry')
     } else {
       res.send('ok');
     }
   }); */


  // If i give only month insted of dailyuage.month , then also it works!!!!!!!!!!!!!!!!!!!!!!!!!!!
  //Items.findOne({ "id" : req.body.cid},{"month": req.body.month}).then(function(foundres)
  //
  //Items.findOne({ "id" : req.body.cid},{"dailyusage.month": req.body.month}).then(function(foundres) {

  //var id1=JSON.parse(String(req.param('cid')));

  //console.log('server_body_id1__type',typeof id1);
  //console.log("Update_id is"+id1);
var objdata=String(req.param('cid'));
var objdata1={$eq:objdata};
  Items.find( { $and: [ {"id": objdata1}, {"dailyusage.month": { $eq: uimonth}} ] }).then(function(foundres) {
   if (foundres.length!=1) {
       console.log('Not_Found_record');
         console.log(foundres);
      var uiusebyday={amount:1, date:uidate}
    Items.update(
      { id : objdata},
      { $push : { 'dailyusage': {year:uiyear,month:uimonth,usebyday:uiusebyday}}},
      {upsert: true, safe: false},
      function (err, done) {
        if (err) {
          console.error(err);
        } else {
          res.send('ok');
        }
      });
  } else {
      console.log('Found records');
      console.log(foundres);

        Items.find({ $and: [ {"id": { $eq: objdata }}, {"dailyusage.usebyday.date": { $eq: uidate}} ] }).then(function(founddate) {
            if (founddate.length!=1) {
               console.log('Not_Found_date');

               var uiusebyday={amount:1, date:uidate}

               Items.update(
                 { id : objdata, "dailyusage.month": uimonth },
                 { $push :{ 'dailyusage.$.usebyday': uiusebyday}},
                 {upsert: true},
                 function (err, done) {
                   if (err) {
                     console.error(err);
                   } else {
                     res.send('ok');
                   }
                 });
            }
            else {
               console.log('Found_date');
               const variable=uiday-1;
               //This also works..!!
               //var obj = {};
               //obj['dailyusage.$.usebyday.'+variable+'.amount'] = 1;

               query1='dailyusage.$.usebyday.'+variable+'.amount';

               Items.update(
                 { id : objdata,"dailyusage.month": uimonth},
                 //{ 'dailyusage.usebyday.0.amount': 333},
                 //{$inc: {"dailyusage.$.usebyday.0.amount": 1}},
                 {$inc:{[query1]:1}},
                 {upsert: true},
                 function (err, done) {
                   if (err) {
                     console.error(err);
                   } else {
                     res.send('ok');
                   }
                 });

                /* Items.update(
                   { id : req.body.cid,"dailyusage.usebyday.date": { $eq: uidate}},
                   //{ 'dailyusage.usebyday.0.amount': 333},
                   {$inc: {"dailyusage.$.amount": 1}},
                   //{$inc:{[query1]:1}},
                   {upsert: true},
                   function (err, done) {
                     if (err) {
                       console.error(err);
                     } else {
                       res.send('ok');
                     }
                   });
                    */
            }

        });

      //var access_and_update_amount={$inc: {"dailyusage.$.usebyday.amount": 1}}


  }
})

});

router.post('/retrieve',(req,res) => {

      //{"dailyusage.$" : 1},{ "dailyusage.usebyday.amount" : 1 , _id: 0 }
      // Get just the docs that contain a shapes element where color is 'red'
      /*{$match: {'wateruse.month':  req.body.month}},
      {$project: {
          wateruse: {$filter: {
              input: '$wateruse',
              as: 'wateruse',
              cond: {$eq: ['$$wateruse.month',  req.body.month]}
          }},
          _id: 0
      }} */
  /*Items.findOne({ "id" : req.body.cid},{"dailyusage.month": req.body.month}).then(function(foundres) {
    if (foundres == null) {
      res.send({
        dat: null,
       msg: 'No results'
     })
    }
    else {
      const user=foundres[0];
       console.log(user);

       res.send({
        dat: user,
        msg: 'Valid Cust_id'
      })
    }
  }) */
  // distinct will fetch all vlues from array separatly , but not as object
  //Items.distinct("dailyusage.usebyday",

    Items.find(
      { $and: [ {"id": { $eq: req.body.cid }}, {"dailyusage.month": { $eq: req.body.month}} ] },
      {"dailyusage.$" : 1}
    //{ id: { $eq: req.body.cid}}
    //{ "dailyusage.month": { $eq: req.body.month}}
   //{ "id" : req.body.cid},,{"dailyusage.month": req.body.month},{"dailyusage.usebyday":1}
   ,
    (err,succuss)=> {
    if(err) {
      return res.send({
        suc: false,
        msg: 'Server Error'
      })
    }
    else if(succuss) {
      if(succuss.length!=1) {
        res.send({
          dat: null,
         msg: 'No results'
       })
      }
      else {
         const report=succuss[0];
          console.log(report);

          res.send({
            dat: 1,
           msg: 'Found records+',
           wateruse: report
         })
      }
    }
  })
});



module.exports = router;
