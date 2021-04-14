const express = require("express");
const mongoose = require("mongoose");
const config = require("config");

const app = express();
const PORT = config.get("serverPort");
const URL = config.get("dbUrl");

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
