import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL?.includes("localhost")
    ? false
    : { rejectUnauthorized: false },
});

// generic query function
const query = (text: string, params?: Array<unknown>) =>
  pool.query(text, params);

export const getRaces = async (year?: string) => {
  let text = `
    SELECT * FROM v_races
  `;

  const params: unknown[] = [];

  if (year) {
    text += `
      WHERE
        EXTRACT(YEAR FROM (date->>'start')::date) = $1
        OR EXTRACT(YEAR FROM (date->>'end')::date) = $1
    `;
    params.push(year);
  }

  text += `
    ORDER BY
      COALESCE(
        NULLIF((date->>'start')::date, NULL),
        (date->>'end')::date
      ) ASC
  `;

  const result = await query(text, params);
  return result.rows;
};