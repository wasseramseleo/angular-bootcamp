const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
const DB_PATH = path.join(__dirname, 'db.json');

// --- Middleware ---
app.use(cors());
app.use(bodyParser.json());

// --- Helper Functions ---
const readData = () => {
  const rawData = fs.readFileSync(DB_PATH);
  return JSON.parse(rawData);
};

const writeData = (data) => {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
};

// --- API Endpoints ---

// GET all orders
app.get('/orders', (req, res) => {
  const data = readData();
  res.json(data.orders);
});

// GET a single order by ID
app.get('/orders/:id', (req, res) => {
  const data = readData();
  const order = data.orders.find(o => o.id === parseInt(req.params.id));
  if (order) {
    res.json(order);
  } else {
    res.status(404).send('Order not found');
  }
});

// POST a new order (Create)
app.post('/orders', (req, res) => {
  const data = readData();
  const newOrder = req.body;

  // Find the highest existing ID and add 1
  const maxId = data.orders.reduce((max, order) => (order.id > max ? order.id : max), 0);
  newOrder.id = maxId + 1;
  newOrder.orderDate = new Date().toISOString(); // Set current date

  data.orders.push(newOrder);
  writeData(data);
  res.status(201).json(newOrder);
});

// PUT an existing order (Update)
app.put('/orders/:id', (req, res) => {
  const data = readData();
  const orderIndex = data.orders.findIndex(o => o.id === parseInt(req.params.id));

  if (orderIndex !== -1) {
    const updatedOrder = { ...data.orders[orderIndex], ...req.body };
    data.orders[orderIndex] = updatedOrder;
    writeData(data);
    res.json(updatedOrder);
  } else {
    res.status(404).send('Order not found');
  }
});

// DELETE an order by ID
app.delete('/orders/:id', (req, res) => {
  const data = readData();
  const orderIndex = data.orders.findIndex(o => o.id === parseInt(req.params.id));

  if (orderIndex !== -1) {
    data.orders.splice(orderIndex, 1);
    writeData(data);
    res.status(204).send(); // No content
  } else {
    res.status(404).send('Order not found');
  }
});

// --- Start Server ---
app.listen(PORT, () => {
  console.log(`Mock API server is running on http://localhost:${PORT}`);
});
