import express from "express";
import { Request, Response } from 'express';
import 'dotenv/config';
import bodyParser from 'body-parser';
import query from './db.js';
import * as dbReq from './dbRequests.js';
import dairyRecordRouter from './diaryRecordRoute.js';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const port:number = parseInt(process.env.PORT as string,10) || 3000;
const __dirname = path.dirname(fileURLToPath(import.meta.url));
try{
query(dbReq.generateBasicEnvironment);
}catch(err){
  console.error('Failed to create basic enviroment:',err.code)
}
console.log('Basic enviroment generated');

app.use(bodyParser.json());

app.use((req, res, next) => {
  if (req.body && req.body.date) {
    req.body.date = new Date(req.body.date); 
  }
  next();
});
app.use(express.static(__dirname));
app.get("/",async(req:Request,res:Response)=>{
  const filePath = path.join(__dirname, 'index.html');
  res.status(200).sendFile(filePath);
});

app.use('/diaryRecords', dairyRecordRouter);


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
}).on('error', (err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
