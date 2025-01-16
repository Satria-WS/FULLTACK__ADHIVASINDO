import express from 'express';
import { listContent, createContent, updateContent, deleteContent } from '../controllers/contentController';


const router = express.Router();


router.get('/content',  listContent);
router.post('/content', createContent);
router.put('/content/:id', updateContent);
router.delete('/content/:id',  deleteContent);


export default router;
