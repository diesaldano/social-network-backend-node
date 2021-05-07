##Data base. 
Archivo config tiene las credenciales para la db de desarrollo que estamos trabajando.


- Data table created: auth, user, follow, post.
- remotemysql.com for sql db for tryed / test.


##Microservicios
Un microservicio es una pequeña aplicación que se encarga de una parte de un software más complejo de manera aislada, y se comunica con el resto del software mediante diferentes métodos: peticiones HTTP, o algún sistema de colas. micro.js es una librería muy pequeña (alrededor de 100 líneas de código) de JavaScript, que nos permite usar Node.js para crear fácilmente microservicios que funcionen sobre el protocolo HTTP, y haciendo uso de Async/Await y todas las características que se incluyeron en ECMAScript 2015 para facilitarnos el programarlos.

## Pm2 - Gestion de servicios.
Sirve para monitorear nuestras apis, imaginate que tienes unos 15 o 20 servicios, y uno empieza a fallar. ¿como nos damos cuenta cuál fue? Este programa sirve para monitoring. Install: yarn add pm2. 
`pm2 start` para iniciar. 

Comentarios: Muy interesante   para poder gestionar en ambientes tipo PRD y tiene varias funcionalidades más.

Enlace: `https://pm2.keymetrics.io/`

## now/ zeit deploy 
Install: `yarn add vercel` -  Ingress: vercel.com

Es una plataforma serverless que permite abstraer todas las funciones que existen por debajo, corre con AWS levanta cada servicio de node como si fueran funciones lambda que se ejecutan, hacen lo que tienen que hacer y mueren.

iniciamos now con `vercer login` y seguimos las instrucciones.
creamos el archivo de configuracion en la carpeta raiz `vercel.json`

##  Variables de entorno en Now y despliegue local
Cuando desplegamos en local con vercel dev se tomarán las variables locales que tengamos en nuestro archivo .dev o en nuestras variables de entorno, no se toman en cuenta los secrets, ya que estos son para un ambiente de producción.
comands: `versel --prod` || en el entorno local `vercel dev`
Para las variables de entorno utilizamos los SECRETS -> https://vercel.com/docs/cli#commands/secrets

Alternative: `dotenv`

## Catching - caché
Definición: El Cache es una forma más rápida de servir contenido que ya conocemos.
