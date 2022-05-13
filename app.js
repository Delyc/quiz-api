import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import QuizRouter from "./routes/quiz.js";
import userRouter from "./routes/user.js";
import createQuizRouter from "./src/quizApp/routes.js";

const app = express();
app.use(express.json());
dotenv.config();

const port = process.env.PORT || 7000;
app.use((req, res, next) => {
  console.log(req.url, req.method);
  return next();
});
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set("view engine", "ejs");
app.use("/api/quiz", QuizRouter);
app.use("/api/users", userRouter);
app.use("/", createQuizRouter);
app.get("/", (req, res) => {
  res.send("Welcome!");
});

mongoose
  .connect(process.env.MONGOURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("db connection success");
    app.listen(port, () => console.log("server starting: ", port));
  })
  .catch((error) => console.log(error));
