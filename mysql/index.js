const express = require('express');
// var bodyParser = require('body-parser');

const config = require('../config/config')
const router = require('./network');

const app = express();

app.use(express.json());
app.use(express.urlencoded());

//Rutas
app.use('/', router)

app.listen(config.mysqlService.port, ()=>{
	console.log('Servicio de mysql escuchando en el puerto', config.mysqlService.port);
})