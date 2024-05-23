//To connect db
require('dotenv').config();

// require express
const express = require('express');
require('express-async-errors')
//app
const app = express();

//handle errors  
const errHandler = require('./middleware/error-handler')
const notFound = require('./middleware/not-found')

console.log('04 Store API');

// connect db
const connectDB = require('./db/connect');


//middleware
app.use(express.json());

//rootes
app.get('/', (req, res) => {
    res.send('<h1>Store Api</h1><a href="/api/v1/products">products route</a>')
})
//get products route
const productsRouter = require('./routes/products');


//use middleware products api 
app.use("/api/v1/products", productsRouter);

//handle errors mid-wares
app.use(notFound);
app.use(errHandler)

//listen to server
const port = process.env.PORT || 3000;
//require('./populate')
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        console.log('read db ?!')
        app.listen(port, () => console.log(`Server is listening port ${port}`))
    } catch (err) {
        console.log(`err --- >  ${err}`);
    }
};
start();


/*
const connectDb = require('./db/connect')
const express = require('express');
const tasks = require('./routes/tasks')
require('dotenv').config()
const notFound = require('./middleware/notFound')
const app = express();

app.use(express.json())
app.use('/api/v1/tasks', tasks);

app.use(express.static('./public'))
app.use(notFound)

const start = async () => {
    const port = 3000;
    try {
        await connectDb(process.env.MONGO_URI)
        app.listen(port, () => console.log(`app is listening to port: ${port}`));
    } catch (err) {
        console.log(` ! ------> ${err}`)
    }
}
start()
*/