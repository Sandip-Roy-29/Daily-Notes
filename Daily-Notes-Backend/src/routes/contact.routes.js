import { Router } from "express";
import { sendMessage } from "../controllers/contact.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/").post(verifyJWT, sendMessage);

export default router;