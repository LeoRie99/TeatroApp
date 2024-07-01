import Admin from '../models/adminModel.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const saltRounds = 10;
const secretKey = 'appProducts';

const adminController = {
  // Obtener todos los administradores
  getAllAdmin: async (req, res) => {
    try {
      const admins = await Admin.find();
      res.json({ admins });
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener administradores' });
    }
  },

  // Obtener un administrador por su ID
  getAdminById: async (req, res) => {
    try {
      const adminId = req.params.id;
      const admin = await Admin.findById(adminId);
      if (!admin) {
        return res.status(404).json({ error: 'Administrador no encontrado' });
      }
      res.json(admin);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener administrador por ID' });
    }
  },

  // Crear un nuevo administrador
  createAdmin: async (req, res) => {
    try {
      const { nombreTeatro, mail, contraseña } = req.body;
      const passwordHash = await bcrypt.hash(contraseña, saltRounds);

      const newAdmin = new Admin({
        nombreTeatro,
        mail,
        contraseña: passwordHash
      });

      const savedAdmin = await newAdmin.save();
      res.status(201).json(savedAdmin);
    } catch (error) {
      console.error('Error al crear administrador:', error);
      res.status(500).json({ error: 'Error interno del servidor al crear administrador' });
    }
  },

  // Iniciar sesión para administradores
  login: async (req, res) => {
    try {
      const { mail, contraseña } = req.body;
      const admin = await Admin.findOne({ mail });
      if (!admin) {
        return res.status(401).json({ error: 'Administrador no encontrado' });
      }
      const isPasswordValid = await bcrypt.compare(contraseña, admin.contraseña);
      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Contraseña incorrecta' });
      }
      const token = jwt.sign({ id: admin._id, mail: admin.mail }, secretKey, { expiresIn: '1h' });
      res.json({ token });
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      res.status(500).json({ error: 'Error interno del servidor al iniciar sesión' });
    }
  },

  // Actualizar un administrador
  updateAdmin: async (req, res) => {
    try {
      const adminId = req.params.id;
      if (req.body.contraseña) {
        req.body.contraseña = await bcrypt.hash(req.body.contraseña, saltRounds);
      }
      const updatedAdmin = await Admin.findByIdAndUpdate(adminId, req.body, { new: true });
      if (!updatedAdmin) {
        return res.status(404).json({ error: 'Administrador no encontrado' });
      }
      res.json(updatedAdmin);
    } catch (error) {
      res.status(500).json({ error: 'Error al actualizar administrador' });
    }
  },

  // Eliminar un administrador
  deleteAdmin: async (req, res) => {
    try {
      const adminId = req.params.id;
      const deletedAdmin = await Admin.findByIdAndDelete(adminId);
      if (!deletedAdmin) {
        return res.status(404).json({ error: 'Administrador no encontrado' });
      }
      res.json({ message: 'Administrador eliminado correctamente' });
    } catch (error) {
      res.status(500).json({ error: 'Error al eliminar administrador' });
    }
  },
};

export default adminController;