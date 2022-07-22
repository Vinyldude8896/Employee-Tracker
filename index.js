// inporting inquirer and FSS functionality
const inquirer = require('inquirer');
const fs = require('fs');
//importing functions to show data
// const showAllEmployees = require('./routes/apiRoutes/employees')

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
        console.log("You chose show all employees");
        // showAllEmployees();
    }
})
}

module.exports = showOrAddData;