// To connect db
require('dotenv').config();
// Path
const path = require('path');
// HTTP
const http = require('http');

// Require express
const express = require('express');
require('express-async-errors');
// App
const app = express();

// Handle errors  
const errHandler = require('./middleware/error-handler');
const notFound = require('./middleware/not-found');

console.log('04 Store API');

// Connect db
const connectDB = require('./db/connect');

// Middleware
app.use(express.json());

// CORS
const cors = require('cors');
app.use(cors());

// Serve static files from the React app build directory
app.use(express.static(path.join(__dirname, 'client/build')));

// Routes
app.get('/', (req, res) => {
    // Send the index.html file from the React app build directory
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

// Route
const productsRouter = require('./routes/products');

// Use middleware products api 
app.use("/api/v1/products", productsRouter);

// Handle errors middlewares
app.use(notFound);
app.use(errHandler);

// Set the maximum header size to 16KB and create server
const server = http.createServer({
    maxHeaderSize: 16384
}, app);

// Listen to server
const port = process.env.PORT || 3000;

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        console.log('Connected to DB');
        // Use the server to listen on the specified port
        server.listen(port, () => console.log(`Server is listening on port ${port}`));
    } catch (err) {
        console.log(`Error: ${err}`);
    }
};

start();
