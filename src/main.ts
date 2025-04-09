import express from "express";
import 'dotenv/config';
import bodyParser from 'body-parser';
import query from './db';
import * as dbReq from './dbRequests';

const app = express();
const port:number = parseInt(process.env.PORT as string,10) || 3000;

app.use(bodyParser.json());

app.get("/",async(req,res)=>{
  try {
    await query(dbReq.generateBasicEnvironment());
    console.log('Basic enviroment generated');
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500);
    res.send("not OK");
  }
    res.status(200);
    res.send("OK");
    //TODO: page sending
});



app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
