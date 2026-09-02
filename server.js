const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Datos de ejemplo para inicialización rápida
let pedidos = [
  { id: 1, cliente: "Mesa 1", detalle: "Combo A - Hamburguesa", total: 25000, estado: "Pendiente" }
];

// Rutas de API
app.get('/api/v1/pedidos', (req, res) => {
  res.status(200).json({ status: "success", data: pedidos });
});

app.post('/api/v1/pedidos', (req, res) => {
  const { cliente, detalle, total } = req.body;
  if (!cliente || !detalle || !total) {
    return res.status(400).json({ status: "error", message: "Faltan campos obligatorios" });
  }
  const nuevoPedido = {
    id: pedidos.length + 1,
    cliente,
    detalle,
    total,
    estado: "Recibido"
  };
  pedidos.push(nuevoPedido);
  res.status(201).json({ status: "success", data: nuevoPedido });
});

app.listen(PORT, () => {
  console.log(`Servidor activo en el puerto ${PORT}`);
});
