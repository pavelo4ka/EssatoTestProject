import 'dotenv/config';

export function generateBasicEnvironment(): string {
    const schema = process.env.SCHEMA || 'public';  
    const tableName = process.env.TABLE_NAME || 'diary'; 

    const createSchemaQuery = `
        DO $$
        BEGIN
            IF NOT EXISTS (SELECT 1 FROM pg_catalog.pg_namespace WHERE nspname = '${schema}') THEN
                CREATE SCHEMA ${schema};
            END IF;
        END;
        $$;
    `;

    const createTableQuery = `
        DO $$
        BEGIN
            IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = '${schema}' AND table_name = '${tableName}') THEN
                CREATE TABLE ${schema}.${tableName} (
                    id SERIAL PRIMARY KEY,                 
                    description TEXT,                       
                    is_good_day BOOLEAN NOT NULL,           
                    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
                    temperature NUMERIC(5, 1)
                );
            END IF;
        END;
        $$;
    `;

    
    return createSchemaQuery + '\n' + createTableQuery;
}
