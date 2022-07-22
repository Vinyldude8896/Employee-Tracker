const showOrAddData = require('../..');
const db = require('../../db/connection');

function getEmployees () {

    let sql = `SELECT employees.id, employees.first_name, employees.last_name, roles.title AS title, department.name as department, roles.salary AS salary, employees.manager_id AS manager 
    FROM employees
    LEFT JOIN roles
    ON employees.role_id = roles.id
    LEFT JOIN department
    ON roles.department_id = department.id`;

    db.query(sql, (err, res) => 
        {
            if (err) {
                res.status(500).json({error: err.message});
                return;
            }
        console.table(res);
        
        });
        showOrAddData();
    }



module.exports = getEmployees;
