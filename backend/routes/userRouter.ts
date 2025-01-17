import express from 'express';
import { getAllUsers } from '../controllers/authController';


const router = express.Router();

// Rute untuk registrasi
router.get('/user',getAllUsers);



export default router;