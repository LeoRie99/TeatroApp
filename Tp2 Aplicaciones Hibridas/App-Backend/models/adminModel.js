import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema({
nombreTeatro: {type: String, required: true},
mail: {type: String, required: true},
contraseña: {type: String, required: true}
});

const Admin = mongoose.model('Admin', adminSchema);

export default Admin;