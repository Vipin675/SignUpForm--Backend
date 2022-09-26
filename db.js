// getting-started.js
const mongoose = require("mongoose");
const mongoURI = "mongodb://localhost:27017/signupUser";

main()
  .catch((err) => console.log(err))
  .then(() => console.log("Connected to mongoose succefully"));

async function main() {
  await mongoose.connect(mongoURI);

  // use `await mongoose.connect('mongodb://user:password@localhost:27017/test');` if your database has auth enabled
}

module.exports = main;
