require('dotenv').config();

const config = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3000,
  isProd: process.env.NODE_ENV === 'production',
  dbUrl: process.env.DATABASE_URL,
  // apiKey: process.env.API_KEY,
  // jwtSecret: process.env.JWT_SECRET,
}


module.exports = { config };