import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import connectDB from './db.js'; 
import userRoutes from './routes/usuarios.js';
import obraRoutes from './routes/obras.js';
import adminRoutes from './routes/admins.js';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

connectDB();

app.use(cors())
app.use('/api/usuarios', userRoutes);
app.use('/api/obras', obraRoutes);
app.use('/api/admin', adminRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log("El servidor arranco con exito");
  console.table([{ "Servidor iniciado en el puerto": PORT, "URL": `http://localhost:${PORT}` }]);
});