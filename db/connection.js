const mysql = require('mysql2');

// Connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        // Your  MySQL username,
        user: 'kevinnivek',
        // Your MySQL password
        password: 'GraceJones8896$',
        database: 'employee_manager'
    },
    console.log('Connected to the employee_manager database.')
);


module.exports = db;