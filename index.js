require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const authRoutes = require('./routes/auth');
const factsRoutes = require('./routes/facts');

app.use(express.json());
app.use(cors());
app.use('/api/auth', authRoutes);
app.use('/api', factsRoutes);

const PORT = process.env.PORT || 3000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB is connected'))
  .catch((err) => console.log(err));

app.get('/', (req, res) => {
  res.send('sup');
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
