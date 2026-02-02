import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { createNotes, updateNoteTitle, deleteNotes, getCurrentNote } from "../controllers/notes.controller.js";
import { verifyNoteOwner } from "../middlewares/noteAuth.middleware.js";

const router = Router();

router.route("/create-notes").post(verifyJWT, createNotes);
router.route("/:noteId/title").put(verifyJWT, verifyNoteOwner, updateNoteTitle);
router.route("/:noteId").delete(verifyJWT, verifyNoteOwner, deleteNotes);
router.route("/").get( verifyJWT, getCurrentNote);

export default router;