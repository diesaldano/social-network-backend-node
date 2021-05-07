module.exports = {
  remoteDB: process.env.REMOTE_DB || false,
  api: {
    port: process.env.API_PORT || 3004
  },
  post: {
    port: process.env.API_PORT || 3005
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'Secret!'
  },
  mysql: {
    host: process.env.MYSQL_HOST || 'remotemysql.com',
    user: process.env.MYSQL_USER || 'm0iQxHsDh2',
    password: process.env.MYSQL_PASS || 'BgoJMG0yXK',
    database: process.env.MYSQL_DB || 'm0iQxHsDh2',
  },
  mysqlService: {
    host: process.env.MYSQL_SRV_HOST || 'localhost',
    port: process.env.MYSQL_SRV_PORT || 3006
  },
  cacheService: {
    host: process.env.REDIS_HOST || 'redis-17022.c15.us-east-1-2.ec2.cloud.redislabs.com',
    port: process.env.REDIS_PORT || 17022,
    password: process.env.REDIS_PASSWORD || '3k2MDpj8ftd5ktZU8c52bGKgTNl6VfaD',
  }

}