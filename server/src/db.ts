import pkg from 'pg';
import 'dotenv/config';

const { Pool } = pkg;

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost', // Database host, default to 'localhost'
  port: parseInt(process.env.DB_PORT as string, 10) || 5432, // Database port, default to 5432
  user: process.env.DB_USER || 'postgres', // Database user, default to 'postgres'
  database: process.env.DB_NAME || 'postgres', // Database name, default to 'postgres'
});

pool.on('error', (err) => {
  console.error('DataBase error: ', err.code); 
});

const query = async (text?: string, params?: string[]) => {  
  return await pool.query(text, params); 
};

export default query;
