const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const orderRoute = require("./routes/orderRoute");

const app = express();
app.use(cors());
app.use(express.json());

const DB =
  "mongodb+srv://jth:aadusRhzQqnw1HAU@cluster0.i4px3.mongodb.net/auth?retryWrites=true&w=majority";

const connect = async () => {
  try {
    await mongoose.connect(DB);
    console.log("DB is connected");
  } catch (error) {
    throw err;
  }
};

mongoose.connection.on("disconnect", () =>
  console.log("mongoDB disconnected!")
);
mongoose.connection.on("connect", () => console.log("mongoDB connected!"));

const PORT = process.env.PORT || 3001;

// app.get("/", (req, res) => console.log("test"));

app.use("/order", orderRoute);

app.listen(PORT, () => {
  connect();
  console.log(`Listening on port ${PORT}`);
});
