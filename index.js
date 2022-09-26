const express = require("express");
const mongodb = require("./db");
const cors = require("cors");
const PORT = 8080;

mongodb();

const app = express();

app.use(cors());
app.use(express.json());

//Available routes :
app.use("/api/auth", require("./routes/auth"));

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
