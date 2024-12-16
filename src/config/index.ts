import dotenv from 'dotenv';

dotenv.config({ path: "D:/Programming hero/project1/.env" });


export default {
  NODE_ENV : process.env.NODE_ENV,
  port: process.env.PORT || 5000,
  database_url: process.env.DATABASE_URL,
  bcrypt_salt_rounds : process.env.BCRYPT_SALT_ROUNDS,
  default_password : process.env.DEFAULT_PASSWORD
};