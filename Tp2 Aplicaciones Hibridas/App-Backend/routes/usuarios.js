// routes/usuarios.js
import express from 'express';
import userController from '../controllers/userController.js';
import { authMiddleware } from '../authMiddleware.js';

const router = express.Router();

// Endpoints públicos (sin autenticación requerida)
router.post('/register', userController.createUser);
router.post('/login', userController.login);

// Endpoints protegidos que requieren autenticación
router.get('/profile', authMiddleware, userController.getProfile);
router.put('/:id', authMiddleware, userController.updateUser);
router.delete('/:id', authMiddleware, userController.deleteUser);

// Endpoint para obtener todos los usuarios (solo para administradores, por ejemplo)
router.get('/', userController.getAllUsers);

// Endpoint para obtener un usuario por su ID
router.get('/:id', userController.getUserById);

export default router;
