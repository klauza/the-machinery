const express = require('express');
const connectDB = require('./config/db');

const app = express();

// connect mongoDB database
connectDB();

// middleware
app.use(express.json({ extended: false })); // body data now can be accepted

// endpoint /
app.get('/', (request, response) => response.send('<h1>Hello</h1>'));

// routes
app.use('/api/logs', require('./routes/logs'));
app.use('/api/techs', require('./routes/techs'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server started on port ${PORT}`));
