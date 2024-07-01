import Obra from '../models/obraModel.js';

const obraController = {
  // Obtener todas las obras
  getAllObras: async (req, res) => {
    try {
      const obras = await Obra.find();
      res.json(obras);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener obras' });
    }
  },

  // Obtener una obra por su ID
  getObraById: async (req, res) => {
    try {
      const obraId = req.params.id;
      const obra = await Obra.findById(obraId);
      if (!obra) {
        return res.status(404).json({ error: 'Obra no encontrada' });
      }
      res.json(obra);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener obra por ID' });
    }
  },

     // Obtener obras por admin ID (teatro ID)
  getObrasByAdminId: async (req, res) => {
    try {
      const adminId = req.params.adminId;
      const obras = await Obra.find({ admin: adminId });
      res.json(obras);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener obras por admin ID' });
    }
  },

  // Crear una nueva obra
  createObra: async (req, res) => {
    try {
      const newObra = new Obra(req.body);
      const savedObra = await newObra.save();
      res.status(201).json(savedObra);
    } catch (error) {
      console.error('Error al crear obra:', error);
      res.status(500).json({ error: 'Error interno del servidor al crear obra' });
    }
  },

  // Actualizar una obra
  updateObra: async (req, res) => {
    try {
      const obraId = req.params.id;
      const updatedObra = await Obra.findByIdAndUpdate(obraId, req.body, { new: true });
      if (!updatedObra) {
        return res.status(404).json({ error: 'Obra no encontrada' });
      }
      res.json(updatedObra);
    } catch (error) {
      res.status(500).json({ error: 'Error al actualizar obra' });
    }
  },

  // Eliminar una obra
  deleteObra: async (req, res) => {
    try {
      const obraId = req.params.id;
      const deletedObra = await Obra.findByIdAndDelete(obraId);
      if (!deletedObra) {
        return res.status(404).json({ error: 'Obra no encontrada' });
      }
      res.json({ message: 'Obra eliminada correctamente' });
    } catch (error) {
      res.status(500).json({ error: 'Error al eliminar obra' });
    }
  },
};

export default obraController;