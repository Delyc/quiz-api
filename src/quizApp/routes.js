import { Router } from "express";
import { authenticate } from "../../middlewares/auth.js";
import * as views from "./views.js";

const router = Router();

router.post("/quiz", authenticate, views.createQuiz);
router.get("/quiz", authenticate, views.getQuizes);
router.get("/quiz/:id", authenticate, views.getQuiz);
router.post("/quiz-check/:id", authenticate, views.viewScores);

export default router;
