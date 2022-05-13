import express from "express";
const QuizRouter = express.Router();

import { createQn, updateQn, getQnById, viewAllQns, deleteQn, completeQn, assignQuestions } from "../controllers/quiz.js";
import { authenticate } from "../middlewares/auth.js";

QuizRouter.post("/",authenticate, createQn);
QuizRouter.put("/:id", authenticate, updateQn);
QuizRouter.put("/answer/:id",authenticate, completeQn);
QuizRouter.get("/:id", authenticate, getQnById)
QuizRouter.get("/", authenticate, viewAllQns)
QuizRouter.delete("/:id", authenticate, deleteQn )
QuizRouter.put("/pickquiz/:id", authenticate, assignQuestions)

export default QuizRouter;

