const express = require('express');
const app = express();
const cors = require('cors');
const dotenv=require('dotenv')
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth.js');
const eventRoutes = require('./routes/events.js');
const bookingRoutes = require('./routes/bookings.js');
dotenv.config();

app.use(cors());
app.use(express.json());
//Routes
app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/bookings',bookingRoutes);

//Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
.then(() => {
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});


app.listen(process.env.PORT, () => {
  console.log(`Server is running on PORT ${process.env.PORT}`);
});
