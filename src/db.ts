import { Pool } from 'pg';
import 'dotenv/config';


const pool = new Pool({
  host: process.env.DB_HOST || 'http://localhost',
  port: parseInt(process.env.DB_PORT as string,10) || 5432,
  user: process.env.DB_USER || 'postgres',
  database: process.env.DB_NAME || 'postgres',
});

const query = (text?:string, params?:string[]) => {
  return pool.query(text, params);
};

export default query;
