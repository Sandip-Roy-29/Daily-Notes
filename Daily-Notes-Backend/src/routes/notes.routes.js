import { Router } from 'express';
import { verifyJWT } from '../middlewares/auth.middleware.js';
import {
  createNotes,
  updateNoteTitle,
  deleteNotes,
  getCurrentNote,
  addContents,
  updateContent,
  getCurrentNoteContents,
  deleteContent,
} from '../controllers/notes.controller.js';
import {
  verifyNoteOwner,
  verifyContentOwner,
} from '../middlewares/noteAuth.middleware.js';

const router = Router();

router.route('/').post(verifyJWT, createNotes);
router.route('/:noteId/title').put(verifyJWT, verifyNoteOwner, updateNoteTitle);
router.route('/:noteId').delete(verifyJWT, verifyNoteOwner, deleteNotes);
router.route('/').get(verifyJWT, getCurrentNote);
router.route('/:noteId/contents').post(verifyJWT, verifyNoteOwner, addContents);
router
  .route('/:noteId/contents')
  .get(verifyJWT, verifyNoteOwner, getCurrentNoteContents);
router
  .route('/:noteId/contents/:contentId')
  .put(verifyJWT, verifyNoteOwner, verifyContentOwner, updateContent);
router
  .route('/:noteId/contents/:contentId')
  .delete(verifyJWT, verifyNoteOwner, verifyContentOwner, deleteContent);

export default router;
