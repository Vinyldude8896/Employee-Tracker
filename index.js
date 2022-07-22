// inporting inquirer and FSS functionality
const inquirer = require('inquirer');
const express = require('express');
const db = require('./db/connection');
const app = express();



// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// importing functions
const getEmployees = require('./routes/apiRoutes/employees.js') ;




const addNewEmployee = ((first_name, last_name, role_id, res) => {

    const sql = `INSERT INTO employees (first_name, last_name, role_id)
    VALUES (?,?,?)`

    const params = [first_name, last_name, role_id];
    console.log("the  params are:" + params);

    db.query(sql, params, (err, result) => 
        {
            if (err) {
                res.status(500).json({error: err.message});
                return;
            }
    console.table(params)
        });
     showOrAddData();
    });

function getNewEmployeeInfo (){

    return inquirer.prompt([

        // Prompt User for information about new employee
        {
            type: 'input',
            name: 'first_name',
            message: 'What is their first name?',
        },
        {
            type: 'input',
            name: 'last_name',
            message: 'What is the their last name?',
        }, 
        {
            type: 'checkbox',
            name: 'role',
            message: 'What is their role?',
            choices: ["Sales Lead", "Salesperson", "Software Engineer", "Account Manager", "Accountant", "Legal Team Lead", "Lawyer"],

        },
    ])
        // Then checking the value of the input to call other functions
    .then ( data => {
        console.log(data);
        const role = JSON.stringify(data.role);
        let role_id = 0;
        if (role === '["Sales Lead"]'){
           role_id = 1;
        } else if (role === '["Salesperson"]'){
            role_id = 2;
        } else if (role === '["Software Engineer"]'){
            role_id = 3;
        } else if (role === '["Account Manager"]'){
            role_id = 4;
        } else if (role === '["Accountant"]'){
            role_id = 5;
        } else if (role === '["Legal Team Lead"]'){
            role_id = 6;
        } else if (role === '["Lawyer"]'){
            role_id = 7;
        } 
        console.log("The role_id is now" + role_id)
        addNewEmployee(data.first_name, data.last_name, role_id); 
    })
}


function validateChoice(choice) {
    if(choice === '["View All Employees"]') {
        console.log("You chose to show all employees");
        getEmployees();
        return;
    }  else if (choice === '["Add Employee"]') {
        console.log("You chose to add an employee");
        getNewEmployeeInfo();
        return;
    } 
    
    
    
    else if (choice === '["Quit"]') {
        console.log("Have a good day!");
       return;
    }

}


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
        validateChoice(choice)

    })
}

module.exports = showOrAddData;
