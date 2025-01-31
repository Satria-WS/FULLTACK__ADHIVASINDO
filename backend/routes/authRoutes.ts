import express from 'express';
import { register, login, logout ,verify} from "../controllers/authController";


const router = express.Router();

// Rute untuk registrasi
router.post('/register', register);

// Rute untuk login
router.post('/login', login);
// Rute untuk logout
router.post('/logout', logout);
router.get('/verify', verify);



export default router;