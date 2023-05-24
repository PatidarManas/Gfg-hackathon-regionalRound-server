import express from "express";
import { apply, login, register, update, updaterating } from "../controllers/seeker.js";

const router = express.Router();
 
router.post("/register",register);
router.post("/login",login);
router.post("/apply",apply);
router.post("/update",update);
router.post("/updaterating",updaterating);

export default router;
