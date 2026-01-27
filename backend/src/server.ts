import express from "express";
import "dotenv/config";
import "dotenv/config"; 
import cors from "cors";

const app = express();
const port = process.env.PORT;

app.use(cors()); 
app.use(express.json());


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

export default app;

        