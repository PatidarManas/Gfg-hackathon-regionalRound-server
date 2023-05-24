import express from "express";
import {
  accepted,
  login,
  register,
  rejected,
  update,
} from "../controllers/provider.js";

const router = express.Router();

router.post("/register", register);
router.post('/login', login);
router.post("/accept", accepted);
router.post("/reject", rejected);
router.post("/update", update);

export default router;
