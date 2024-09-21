const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const connectDb = require('./db'); // Ensure the file path is correct for your DB connection

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true 
}));

const adminRollRoute = require('./routes/userRoute'); 
app.use('/api', adminRollRoute);

app.get('/', (req, res) => {
    res.send('Server is running and connected to the database');
});

app.listen(4004, () => {
    console.log(`Server is started on port 4004`);
});
