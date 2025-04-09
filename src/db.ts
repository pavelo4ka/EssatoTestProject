import { Pool } from 'pg';
import 'dotenv/config';


const pool = new Pool({
  host: process.env.DB_HOST || 'http://localhost',
  port: parseInt(process.env.DB_PORT as string,10) || 5432,
  user: process.env.DB_USER || 'postgres',
  database: process.env.DB_NAME || 'postgres',
});

pool.on('error', (err) => {
  console.error('DataBase error: ', err.code);
  process.exit(1);
});

const query = async (text?:string, params?:string[]) => {
  try{
    return await pool.query(text, params);
  }catch(err:any){
    console.error('DataBase error:', err.code);
  process.exit(1);
  }
};

export default query;
