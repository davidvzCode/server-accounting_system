require('dotenv').config()

const config = {
    env: process.env.NODE_ENV || 'dev',
    isProd: process.env.NODE_ENV === 'production',
    port: process.env.PORT || 3000,
    dbUrl: process.env.DATABASE_URL,
    apikey: process.env.API_KEY,
    jwtSecret: process.env.JWT_SECRET,
    gmailUser: process.env.GMAIL_USER,
    gmailPassword: process.env.GMAIL_PASSWORD,
}

module.exports = { config }
