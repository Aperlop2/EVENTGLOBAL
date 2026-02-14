const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Conectar a MongoDB Atlas
mongoose.connect(process.env.MONGO_URI).then(() => console.log('MongoDB connected')).catch(err => console.error(err));

// Definir el esquema y modelo de Usuario
const userSchema = new mongoose.Schema({
    email: String,
    password: String,
    fullName: String,
    municipality: String,
    street: String,
    neighborhood: String,
    interiorNumber: String,
    exteriorNumber: String,
    postalCode: String,
    location: {
        lat: Number,
        lng: Number
    }
});

const User = mongoose.model('User', userSchema);

// Rutas
app.post('/users', async(req, res) => {
    const user = new User(req.body);
    await user.save();
    res.send(user);
});

app.get('/users/:id', async(req, res) => {
    const user = await User.findById(req.params.id);
    res.send(user);
});

app.put('/users/:id', async(req, res) => {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.send(user);
});

app.delete('/users/:id', async(req, res) => {
    await User.findByIdAndDelete(req.params.id);
    res.send({ message: 'User deleted' });
});

// Nueva ruta para obtener todos los usuarios
app.get('/users', async(req, res) => {
    const users = await User.find();
    res.send(users);
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});