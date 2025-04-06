import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

// generic query function
const query = (text: string, params?: Array<unknown>) =>
  pool.query(text, params);

export const getUpcomingRaces = async () => {
  const text = `
    SELECT 
      races.id,
      TO_CHAR(races.start_date, 'YYYY-MM-DD') AS start_date,
      TO_CHAR(races.end_date, 'YYYY-MM-DD') AS end_date, 
      array_to_json(races.categories) AS categories,
      array_to_json(races.engine_types) AS engine_types,
      array_to_json(races.championships) AS championships,
      races.live_links,
      circuits.location_name,
      countries.name AS country_name,
      countries.code AS country_code
    FROM races
    INNER JOIN circuits ON races.circuit_id = circuits.id
    INNER JOIN countries ON circuits.country_id = countries.id
    WHERE races.end_date >= NOW()
    ORDER BY races.end_date ASC
  `;
  const result = await query(text);
  return result.rows;
};

export const getPastRaces = async (withResults: boolean = false) => {
  const text = `
    SELECT 
      races.id,
      TO_CHAR(races.start_date, 'YYYY-MM-DD') AS start_date,
      TO_CHAR(races.end_date, 'YYYY-MM-DD') AS end_date, 
      array_to_json(races.categories) AS categories,
      array_to_json(races.engine_types) AS engine_types,
      array_to_json(races.championships) AS championships,
      races.results_links,
      circuits.location_name,
      countries.name AS country_name,
      countries.code AS country_code
    FROM races
    INNER JOIN circuits ON races.circuit_id = circuits.id
    INNER JOIN countries ON circuits.country_id = countries.id
    WHERE races.end_date < NOW()
    ${withResults ? "AND races.results_links IS NOT NULL" : ""} 
    ORDER BY races.end_date DESC
  `;
  const result = await query(text);
  return result.rows;
};