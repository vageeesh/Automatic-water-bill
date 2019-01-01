const express = require('express');
const exphbs=require('express-handlebars');
const app=express();
const clogin=require('./routes/clogin')
const usage=require('./routes/usage')

var bodyparser=require('body-parser');

const mongoose=require('mongoose');
mongoose.Promise= global.Promise;


const db = require('./mongoconfig/config').mongoURI;
//require('./models/mongodatabase');

/* //Connect to Local Database
mongoose.connect('mongodb://localhost/database1', {

})
.then(()=>console.log('connected to mongodb'))
.catch(err=>console.log(err));
*/

//Connect To remote mLab Database

mongoose.connect(db)
  .then(()=>console.log('connected to remote databse'))
  .catch(err=>console.Log(err));


//const mongoclogin=mongoose.model('mycustomer');

//set up
//const path=require('path');
//var fs=require('fs');

//app.use(express.json());
app.use(bodyparser.json());

/*app.engine('handlebars',exphbs({
  defaultLayout: 'main'
}));

app.set('view engine','handlebars'); */

/*
app.engine('handlebars', require('exphbs'));
app.set('view engine', 'handlebars');




app.get('/',function(req,res){
//  res.sendFile('index.html',{roo: path.join(__dirname, './views1')});
//res.sendFile('C:\Users\vageesh\Documents\Project5sem\views1\LoginPage.html');
  res.render('LoginPage');
});
app.post('/auth',function(req,res) {
  res.send("Hellow buddy");

  const newuser= {
    id:req.body.id
  }
  new mongoclogin(newuser).save().then(idea=>{
    console.log('saved to databse');
  })
  var id=req.body;
  console.log(id);
});
*/
//use router
app.use('/customer',clogin);

app.listen(8080,function(){
  console.log('Listening request');
});
