require('dotenv').config();
const express = require('express')
const errHandler = require('./middleware/error-handler')
const notFound = require('./middleware/not-found')
//app
const app = express()
console.log('04 Store API')
const connectDB = require('./connect/connect')

//middleware
app.use(express.json());

//rootes
app.get('/', (req, res) => {
    res.send('<h1>Store Api</h1><a href="/api/v1/products">products route</a><a href="/api/v1/products/static">static products route</a>')
})
//get products route
const productRoute = require('./routes/products')
//use products api
app.use("/api/v1/products", productRoute);
//handle errors mid-wares
app.use(notFound);
app.use(errHandler)

//listen to server
const port = process.env.PORT || 3000;
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, () => console.log(`Server is listening port ${port}`))
    } catch (err) {
        console.log('err')
    }
}
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