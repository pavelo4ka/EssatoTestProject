import express from "express";
import 'dotenv/config';


const app = express();
const port = parseInt(process.env.PORT as string,10) || 3000;


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
