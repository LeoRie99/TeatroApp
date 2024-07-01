import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    mail: { type: String, required: true },
    telefono: { type: String, required: true },
    nacimiento: { type: String, required: true },
    contraseña: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);

export default User;
