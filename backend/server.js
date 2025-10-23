import express from 'express'
import cors from 'cors'
import { connectDB } from './config/db.js';
import productRouter from './routes/productrouter.js';
import userRouter from './routes/userrouter.js';
import 'dotenv/config'
import cartRouter from './routes/cartRouter.js';
import orderRouter from './routes/orderRouter.js';

// app config

const app = express()
const PORT = 5000;

//db connection
connectDB();

//middleware
app.use(express.json())
app.use(cors())

// api endpoints
app.use('/api/product', productRouter)
app.use('/image', express.static('upload'))
app.use('/api/user',userRouter)
app.use('/api/cart',cartRouter)
app.use('/api/order',orderRouter)



app.listen(PORT,()=>{
  console.log(`Server is listening on localhost:${PORT}`);
})

//  password : ishan <---- for mongo 




