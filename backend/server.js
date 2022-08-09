const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const { urlencoded } = require("express");
const app = express();
dotenv.config();
const MongoDB = require("./config/db");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const port = process.env.PORT;

app.get("/", (req, res) => {
  res.send("Server is running ");
});
app.use("/api/goals", require("./routes/goalRoute"));
app.use("/api/users", require("./routes/userRoute"));

app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});
