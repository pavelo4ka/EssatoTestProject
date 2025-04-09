import express from "express";
import { Request, Response } from 'express';
import 'dotenv/config';
import bodyParser from 'body-parser';
import query from './db';
import * as dbReq from './dbRequests';

const app = express();
const port:number = parseInt(process.env.PORT as string,10) || 3000;


query(dbReq.generateBasicEnvironment());
console.log('Basic enviroment generated');

app.use(bodyParser.json());

app.get("/",async(req:Request,res:Response)=>{
  
    res.status(200);
    res.send("OK");
    
});



app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
}).on('error', (err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
