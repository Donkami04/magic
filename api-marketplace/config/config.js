require('dotenv').config();

const config = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3000,
  isProd: process.env.NODE_ENV === 'production',
  dbUrl: process.env.DATABASE_URL,
  jwtSecret: process.env.JWT_SECRET,
  // apiKey: process.env.API_KEY,
}


module.exports = { config };