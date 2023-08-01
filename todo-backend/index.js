const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');

const PORT = process.env.PORT || 8000;
const todoRoutes = require('./Routes/TodoRoutes');
require('dotenv').config();
require('./db');
app.use(cors());
app.use(bodyParser.json());
app.use('/todo', todoRoutes);

// fontendurl http://localhost:3000/

app.get('/', (req, res) => {
  res.json({ message: 'API is working' });
});

app.listen(PORT, () => {
  console.log(`Server is running at Port ${PORT}`);
});
