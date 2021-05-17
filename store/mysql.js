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

/** Obtener todos los usuarios de la tabla */
function list(table) {
  return  new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM ${table}`, (err, data) => {
      // connection.query(`SELECT * FROM ${table} WHERE id = '${id}'`, (err, data) => {
      if (err) return reject(err)
      resolve(data)
    })
  })
}
/**Obtener usuario de una tabla por id */
function get(table, id) {
  return  new Promise((resolve, reject) => {
      connection.query(`SELECT * FROM ${table} WHERE id=${id}`, (err, data) => {
      if (err) return reject(err)
      resolve(data)
    })
  })
}
/** Insert in data */
function insert(table, data) {
  console.log('insert desde mysql file', table, data)
  return new Promise((resolve, reject) => {
    connection.query(`INSERT INTO ${table} SET ?`, data, (err, result) => {
      if (err) return reject(err);
      console.log('log desde mysql insert ',result)
      resolve(result);
    })
  })
}


/**Actualizar db */
function update(table, data) {
  return new Promise((resolve, reject) => {
    connection.query(`UPDATE ${table} SET ? WHERE id=?`, [data, data.id], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    })
  })
}

function upsert(table, data) {
  if (!data && !data.id) {
    console.log('upsert con update ', table, data)
      return update(table, data);
  } else {
    console.log('upsert con insert ', table, data)
      return insert(table, data);
  }
}

function query(table, query, join) {
  let joinQuery = "";
  if(join){
    const key = Object.keys(join)[0];
    const val = join[key];
    joinQuery = `JOIN ${key} ON ${table}.${val} = ${key}.id`;
  }

  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM ${table} ${joinQuery} WHERE ${table}.?`, 
    query, (err, res) => {
      if (err) return reject(err);
      resolve(res[0] || null);
    })
  })
}


module.exports = {
  list,
  get,
  upsert, 
  query
}