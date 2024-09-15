import { Pool } from 'pg';

const pool = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DB,
  password: process.env.PG_PASSWORD,
  port: parseInt(process.env.PG_PORT || '5432'),
  ssl: {
    rejectUnauthorized: false // This option allows insecure SSL connection, often used in development. In production, you should provide a proper certificate.
  }
});

function toCamelCase(row: any): any {
    const camelCaseRow: any = {};
    for (const key in row) {
      const camelCaseKey = key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
      camelCaseRow[camelCaseKey] = row[key];
    }
    return camelCaseRow;
  }

export { pool, toCamelCase };
