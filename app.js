import 'dotenv/config'
import express from 'express';
import apiRouter from './routes/api-router.js'
import connectToMongoDB from './database.js';

const port = process.env.PORT || 3001;

// crear el servidor
const app = express(); 

// middlewares del servidor
app.use(express.json());
app.use(express.urlencoded({ extended:true }));
app.use('/', apiRouter);


// levantar el servidor
app.listen(port, () => {
    console.log(`server is running on http://localhost:${port}`);
    connectToMongoDB(); // conectarse a mongodb
});
