import 'dotenv/config';


const schema:string = process.env.SCHEMA || 'public';  
const tableName:string = process.env.TABLE_NAME || 'diary'; 

export const generateBasicEnvironment: string =
`
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_catalog.pg_namespace WHERE nspname = '${schema}') THEN
        CREATE SCHEMA ${schema};
    END IF;
END;
$$;
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = '${schema}' AND table_name = '${tableName}') THEN
        CREATE TABLE ${schema}.${tableName} (
            id SERIAL PRIMARY KEY,                 
            description TEXT,                       
            is_good_day BOOLEAN NOT NULL,           
            date DATE DEFAULT CURRENT_DATE,
            temperature NUMERIC(5, 1)
        );
    END IF;
END;
$$;
    `;

export const postDiaryRecord:string = 
`INSERT INTO public.diary (description, is_good_day, date, temperature) 
VALUES ($1, $2, $3, $4)`;

export const putDiaryRecord:string = 
`UPDATE public.diary 
SET description = $1, is_good_day = $2 
WHERE id = $3`;

export const deleteDiaryRecord:string = 'DELETE FROM public.diary WHERE id = $1';

export const getDiaryRecord:string = 'SELECT * FROM public.diary';
