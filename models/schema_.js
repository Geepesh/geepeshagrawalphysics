const mongoose = require('mongoose')
//const uri = "mongodb+srv://geepesh_agrawal:geepeshagrawal@cluster0.n8viw.mongodb.net/message-database?retryWrites=true&w=majority"
const { Schema } = mongoose;
//let mongoose = require('mongoose');
let usrDta = new Schema({
  name : {
    type : String
  },
  email: {
    type : String
  },
  password : {
    type : String
  }
})

const Data = mongoose.model('test_for_social_media',usrDta);
module.exports = Data;
