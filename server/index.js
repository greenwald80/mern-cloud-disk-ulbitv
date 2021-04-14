const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
const authRouter = require("./routes/auth.routes");

const app = express();
const PORT = config.get("serverPort");
const URL = config.get("dbUrl");

app.use(express.json());
app.use("/api/auth", authRouter);

const start = async () => {
  try {
    mongoose.connect(
      URL,
      { useNewUrlParser: true, useUnifiedTopology: true },
      (err) => {
        if (err) throw new Error();
        console.log("Connected to MongoDB");
      }
    );
    app.listen(PORT, () => {
      console.log("Server started on port ", PORT);
    });
  } catch (e) {
    console.log(e);
  }
};

start();
