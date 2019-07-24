const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      // to avoid warnings, need these 3 parameters:
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false
    });

     console.log('MongoDB connected! :> ');

   } catch (err) {
      console.error(err.message);
      process.exit(1);
  }
}

module.exports = connectDB;