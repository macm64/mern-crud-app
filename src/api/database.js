const mongoose = require ('mongoose');

mongoose.connect(process.env.dbURI)
  .then((db)=>{
    console.log('DB connected')
  })
  .catch((err)=> console.log(err));

  module.exports = mongoose;
