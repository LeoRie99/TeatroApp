import mongoose from 'mongoose';

const obraSchema = new mongoose.Schema({
    titulo: { type: String, required: true },
    foto: {type: String, required: true},
    director: {type: String, required: true},
    elenco: {type: String, required: true},
    precio: {type: Number, required: true},
    descripcion: { type: String, required: true },
    admin: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' }
});

const Obra = mongoose.model('Obra', obraSchema);

export default Obra;