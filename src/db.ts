import { Pool } from 'pg';
import 'dotenv/config';


const pool = new Pool({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT as string,10) || 5432,
});

const query = (text, params) => {
  return pool.query(text, params);
};

export default query;
