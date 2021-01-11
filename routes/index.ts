import { Router } from 'express';
const router = Router();

import homeCon from "../controllers/home";
import userRouter from "./user";

router.get("/", homeCon);

router.use("/user", userRouter)


export default router;