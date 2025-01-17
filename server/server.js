const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const paymentRoutes = require('./routes/paymentRoutes'); // Add this line to import your payment routes

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

// Use the user routes
app.use('/api', userRoutes);
app.use('/api', paymentRoutes); // Add this line to use your payment routes

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
