module.exports = {
  api: {
    port: process.env.API_PORT || 3004
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'Secret!'
  },
  mysql: {
    host: process.env.MYSQL_HOST || 'remotemysql.com',
    user: process.env.MYSQL_HOST || 'm0iQxHsDh2',
    password: process.env.MYSQL_HOST || 'BgoJMG0yXK',
    database: process.env.MYSQL_HOST || 'm0iQxHsDh2',
  },
  mysqlService: {
    host: process.env.MYSQL_SRV_HOST || 'localhost',
    port: process.env.MYSQL_SRV_PORT || 3001
  }
}