// inporting inquirer and FSS functionality
const inquirer = require('inquirer');
const express = require('express');
const db = require('./db/connection');
const app = express();


// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const getEmployees = require('./routes/apiRoutes/employees'); 

//importing functions to show data
const showAllEmployees = require('./routes/apiRoutes/employees');

function showOrAddData () {
    return inquirer.prompt([

        // Initial Prompt to user to ask if they want to view departments, employees, roles,
        // add employee, role or department
        // or quit
        {
            type: 'checkbox',
            name: 'choice',
            message: 'What would you like to do?',
            choices: ["View All Employees", "Add Employee", "Update Employee Role", "View All Roles", "Add Role", "View All Departments", "Add Department", "Quit"],

        },

    ])
        // Then checking the value of the input to call other functions
    .then (data =>{
        const choice = JSON.stringify(data.choice);

    // if the choice was "View All Employees" then query sql database for all employees
    if(choice === '["View All Employees"]') {
        console.log("You chose to show all employees");
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
        }
        })
}

module.exports = showOrAddData;
