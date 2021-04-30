const mysql = require('mysql');

const config = require('../config/config')

const dbconfig = {
  host: config.mysql.host,
  user: config.mysql.user,
  password: config.mysql.password,
  database: config.mysql.database,
};

//Conección
let connection;

function handleCon() {
  connection = mysql.createConnection(dbconfig);

  connection.connect((err) => {
    if (err) {
      console.error('[db error', err);
      setTimeout(handleCon, 2000);
    } else {
      console.log('DB Connected')
    }
  });

  connection.on('error', err => {
    console.error('[db error', err);
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      handleCon();
    } else {
      throw err;
    }
  });
}

handleCon();

function list(list, id) {
  Promise((resolve, reject) => {
    connection.query(`SELECT * FROM ${table}`, (err, data) => {
      // connection.query(`SELECT * FROM ${table} WHERE id = '${id}'`, (err, data) => {
      if (err) return reject(err)
      resolve(data)
    })
  })
}

module.exports = {
  list
}