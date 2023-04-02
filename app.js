const express = require('express');
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const listEndpoints = require('express-list-endpoints');

app.get('/', (req, res) => {
    res.json({ message: 'Hello World!' });
});

app.get('/endpoints', (req, res) => {
    res.json(listEndpoints(app));
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

module.exports = app;
