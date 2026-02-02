import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { createNotes } from "../controllers/notes.controller.js";

const router = Router();

router.route("/create-notes").post(verifyJWT, createNotes);

export default router;