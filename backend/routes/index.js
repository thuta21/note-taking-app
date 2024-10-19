import { Router } from "express";
import authController from "../controllers/authController.js";
import noteController from "../controllers/noteController.js";
import authenticateToken from "../middlewares/authToken.js";

const router = Router();

router.post('/login', authController.login);
router.post('/register', authController.register);
router.get('/get-user', authenticateToken, authController.getUser);

router.get('/notes', authenticateToken ,noteController.index);
router.post('/notes', authenticateToken, noteController.create);
router.get('/notes/:id', authenticateToken, noteController.show);
router.put('/notes/:id', authenticateToken, noteController.update);
router.delete('/notes/:id', authenticateToken, noteController.destroy);

export default router;
