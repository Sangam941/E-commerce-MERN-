import express from "express";
import "dotenv/config";
import cors from "cors";
import { connectToDB } from "./config/db.js";

const app = express();
const port = process.env.PORT;

connectToDB()

app.use(cors()); 
app.use(express.json());

app.get('/', (req,res)=>{
    res.send("hello from the page")
})

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

export default app;
