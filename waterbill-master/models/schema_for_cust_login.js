const mongoose=require('mongoose');
const Schema= mongoose.Schema;

const ideaSchema=new Schema({
  id: {
    type: String,
    required: true
  },
  dailyusage: [{
      year: Number,
      month: Number,
      usebyday:[{
          amount: Number,
          date: Date
      }]
    }]
});

//mongoose.model('mycustomer',ideaSchema);
module.exports = Item = mongoose.model('mycustomer',ideaSchema);
