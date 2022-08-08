const mongoose = require("mongoose");

const MongoDB = async () => {
  try {
    const conn = mongoose.connect(process.env.MONGO_URL);
    console.log(`MongoDb is runnning`);
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};
MongoDB();
mongoose.exports = MongoDB;
