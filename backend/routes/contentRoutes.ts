import express from 'express';
import { listContent, createContent, updateContent, deleteContent, getContentById, listContentByUser } from '../controllers/contentController';
import authMiddleware from '../middleware/authMiddleware';

const router = express.Router();

router.get('/content', authMiddleware, listContent);
router.get('/content/:id', authMiddleware, getContentById);
// router.get('/content/user', authMiddleware, listContentByUser); // New route for fetching content by user_id
router.post('/content', authMiddleware, createContent); // Ensure authMiddleware is used
router.put('/content/:id', authMiddleware, updateContent); // Ensure authMiddleware is used
router.delete('/content/:id', authMiddleware, deleteContent); // Ensure authMiddleware is used

export default router;

