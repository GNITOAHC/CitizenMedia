import express from "express";
import mongoose from "mongoose";
const app = express();

mongoose
  .connect("mongodb://127.0.0.1:27017/CitizenMediaDB")
  .then(() => console.log("Connecting to MongoDB"))
  .catch((e) => {
    console.log(e);
  });

app.get("/", (_req, res) => {
  res.send("Hello World");
});

app.listen(8080, () => {
  console.log("Listening on port 8080");
});
