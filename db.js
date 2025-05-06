const mongoose = require('mongoose');
const connectDB = async () => {
    try {
      await mongoose.connect('mongodb://admin:admin@localhost:27017/searchengine?authSource=admin', {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
      console.log("MongoDB Connected");
    } catch (err) {
      console.error(err.message);
      process.exit(1);
    }
  };
  
  module.exports = connectDB;