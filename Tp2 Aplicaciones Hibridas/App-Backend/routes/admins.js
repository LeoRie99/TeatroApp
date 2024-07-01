import express from 'express';
const router = express.Router();
import adminController from '../controllers/adminController.js';

// Endpoint para obtener todos los administradores
router.get('/', adminController.getAllAdmin);

// Endpoint para obtener un administrador por su ID
router.get('/:id', adminController.getAdminById);

// Endpoint para crear un nuevo administrador
router.post('/', adminController.createAdmin);

//endpoints para modificar y eliminar administradores
router.put('/:id', adminController.updateAdmin);
router.delete('/:id', adminController.deleteAdmin);

export default router;