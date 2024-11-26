import dotenv from 'dotenv';

dotenv.config({ path: "D:/Programming hero/project1/.env" });


export default {
  port: process.env.PORT || 5000,
  database_url: process.env.DATABASE_URL,
};