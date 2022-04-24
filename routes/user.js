import express from "express";
import { authenticate } from "../middlewares/auth.js";
const userRouter = express.Router();

import {
    createUser,
    loginUser,
    
  } from "../controllers/user.js";






userRouter.post("/", createUser);


 userRouter.post("/login", loginUser);

 export default userRouter;