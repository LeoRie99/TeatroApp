import express from 'express';
const router = express.Router();
import obraController from '../controllers/obraController.js';

router.get('/', obraController.getAllObras);
router.get('/:id', obraController.getObraById);
router.get('/admin/:adminId', obraController.getObrasByAdminId);
router.post('/', obraController.createObra);
router.put('/:id', obraController.updateObra);
router.delete('/:id', obraController.deleteObra);

export default router;