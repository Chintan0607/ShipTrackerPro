const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const web = require("./routes/web.js");
const cors = require("cors");

const app = express();
app.use(cors());
const port = process.env.PORT || "3000";

// JSON
app.use(express.json());

// Root Route
app.get("/", (req, res) => {
  res.send("Welcome to FedEx Track Express API!");
});

// Load Routes
app.use("/fedex", web);

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
