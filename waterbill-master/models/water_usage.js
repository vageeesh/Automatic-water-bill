const mongoose=require('mongoose');
const Schema= mongoose.Schema;

const waterschema=new Schema({
  id: {
    type: String,
    required: true
  },
  dailyusage: [{
      year: Number,
      month: Number,
      amount: [Number]
    }]
});

//mongoose.model('mycustomer',ideaSchema);
module.exports = Item = mongoose.model('waterusage',waterschema);
