const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',      
    user: 'root',           
    password: 'root123',    
    database: 'crud_app',   
    port: 3306              
});

// Exportar la conexión. 
// Usamos .promise() para que las consultas
// puedan usar la sintaxis moderna de Node.js (async/await)
module.exports = pool.promise();