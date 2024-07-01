// controllers/userController.js
import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { secretKey } from '../authMiddleware.js';

const saltRounds = 10;

const userController = {
  // Obtener todos los usuarios
  getAllUsers: async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener usuarios' });
    }
  },

  // Obtener un usuario por su ID
  getUserById: async (req, res) => {
    try {
      const userId = req.params.id;
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener usuario por ID' });
    }
  },

  createUser: async (req, res) => {
    try {
      const { nombre, mail, telefono, nacimiento, contraseña } = req.body;
  
      // Validar que el usuario tenga al menos 18 años
      const fechaNacimientoDate = new Date(nacimiento);
      const hoy = new Date();
      const edad = hoy.getFullYear() - fechaNacimientoDate.getFullYear();
      const mesDiferencia = hoy.getMonth() - fechaNacimientoDate.getMonth();
      if (mesDiferencia < 0 || (mesDiferencia === 0 && hoy.getDate() < fechaNacimientoDate.getDate())) {
        edad--;
      }
  
      if (edad < 18) {
        return res.status(400).json({ error: 'Debes tener al menos 18 años para registrarte.' });
      }
  
      // Formatear el número de teléfono en el formato "11-1111-1111"
      const formattedTelefono = telefono.replace(/^(\d{2})(\d{4})(\d{4})$/, '$1-$2-$3');
  
      // Formatear la fecha de nacimiento en el formato "dd/mm/yyyy"
      const formattedNacimiento = `${fechaNacimientoDate.getDate().toString().padStart(2, '0')}/${
        (fechaNacimientoDate.getMonth() + 1).toString().padStart(2, '0')
      }/${fechaNacimientoDate.getFullYear()}`;
  
      const passwordHash = await bcrypt.hash(contraseña, saltRounds);
  
      const newUser = new User({
        nombre,
        mail,
        telefono: formattedTelefono, // Guardar el teléfono formateado
        nacimiento: formattedNacimiento, // Guardar la fecha formateada
        contraseña: passwordHash
      });
  
      const savedUser = await newUser.save();
  
      res.status(201).json(savedUser);
    } catch (error) {
      console.error('Error al crear usuario:', error);
      res.status(500).json({ error: 'Error interno del servidor al crear usuario' });
    }
  },
  

  // Iniciar sesión
  login: async (req, res) => {
    try {
      const { mail, contraseña } = req.body;
      const user = await User.findOne({ mail });
      if (!user) {
        return res.status(401).json({ error: 'Usuario no encontrado' });
      }
      const isPasswordValid = await bcrypt.compare(contraseña, user.contraseña);
      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Contraseña incorrecta' });
      }
      const token = jwt.sign({ id: user._id, mail: user.mail }, secretKey, { expiresIn: '1h' });
      res.json({ token });
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      res.status(500).json({ error: 'Error interno del servidor al iniciar sesión' });
    }
  },

  // Obtener el perfil del usuario actual
  getProfile: async (req, res) => {
    try {
      const userId = req.user.id; // Obtén el ID del usuario desde el token decodificado
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }
      res.json(user);
    } catch (error) {
      console.error('Error al obtener perfil de usuario:', error);
      res.status(500).json({ error: 'Error interno del servidor al obtener perfil de usuario' });
    }
  },
  // Actualizar un usuario
  updateUser: async (req, res) => {
    try {
      const userId = req.params.id;
      const updatedUser = await User.findByIdAndUpdate(userId, req.body, { new: true });
      if (!updatedUser) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }
      res.json(updatedUser);
    } catch (error) {
      res.status(500).json({ error: 'Error al actualizar usuario' });
    }
  },

  // Eliminar un usuario
  deleteUser: async (req, res) => {
    try {
      const userId = req.params.id;
      const deletedUser = await User.findByIdAndDelete(userId);
      if (!deletedUser) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }
      res.json({ message: 'Usuario eliminado correctamente' });
    } catch (error) {
      res.status(500).json({ error: 'Error al eliminar usuario' });
    }
  }
};

export default userController;
