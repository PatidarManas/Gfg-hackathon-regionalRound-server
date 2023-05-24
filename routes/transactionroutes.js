import express from "express";
import { admin, apply, login, success } from "../controllers/transaction.js";

const router = express.Router();
 
router.post("/login",login);
router.post("/success",success);
router.post("/admin",admin);
router.post("/apply",apply);

export default router;