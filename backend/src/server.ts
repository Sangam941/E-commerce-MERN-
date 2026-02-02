import express from "express";
import "dotenv/config";
import cors from "cors";
import { connectToDB } from "./config/db.js";
import { globalErrorHandler } from "./middleware/error.middleware.js";
import authRoute from './routes/auth.router'
import productRoute from './routes/product.router'
import cartRoute from './routes/cart.router'
import orderRoute from './routes/order.router'

const app = express();
const port = process.env.PORT;

connectToDB()

app.use(cors()); 
app.use(express.json());

app.get('/', (req,res)=>{
    res.send("hello from the page")
})

app.use('/api/auth', authRoute)
app.use('/api/products', productRoute)
app.use('/api/cart', cartRoute)
app.use('/api/orders', orderRoute)

app.use(globalErrorHandler)

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

export default app;
