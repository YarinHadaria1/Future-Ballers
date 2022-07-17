const mongoose = require("mongoose");
const config = require("config");
const db = config.get("mongoURI");

const connectToDb = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
    });

    console.log("Successfully connected to the DB");
  } catch (err) {
    console.error(err.message);
    // Exit process
    process.exit(1);
  }
};

module.exports = connectToDb;
