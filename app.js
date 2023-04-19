const express = require('express');
const cors = require('cors');
const asyncHandler = require('express-async-handler');

const app = express();
app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000' }));

const items = [
    { id: 1, name: 'item 1' },
    { id: 2, name: 'item 2' },
    { id: 3, name: 'item 3' },
];

// Get all items
app.get('/items', asyncHandler(async (req, res) => {
    res.json(items);
}));

// Get a specific item by ID
app.get('/items/:id', asyncHandler(async (req, res) => {
    const itemId = parseInt(req.params.id);
    const item = items.find(item => item.id === itemId);
    if (item) {
        res.json(item);
    } else {
        res.status(404).json({ message: 'Item not found' });
    }
}));

// Create a new item
app.post('/items', asyncHandler(async (req, res) => {
    const newItem = { id: items.length + 1, name: req.body.name };
    items.push(newItem);
    res.status(201).json(newItem);
}));

// Update an existing item
app.put('/items/:id', asyncHandler(async (req, res) => {
    const itemId = parseInt(req.params.id);
    const item = items.find(item => item.id === itemId);
    if (item) {
        item.name = req.body.name;
        res.json(item);
    } else {
        res.status(404).json({ message: 'Item not found' });
    }
}));

// Delete an existing item
app.delete('/items/:id', asyncHandler(async (req, res) => {
    const itemId = parseInt(req.params.id);
    const index = items.findIndex(item => item.id === itemId);
    if (index >= 0) {
        items.splice(index, 1);
        res.status(204).end();
    } else {
        res.status(404).json({ message: 'Item not found' });
    }
}));

const port = 3001;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
