// inporting inquirer and FSS functionality
const inquirer = require('inquirer');
const db = require('./db/connection');



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
                console.log(err);
                return;
            }
        console.table(res);
        showOrAddData();
        });
    }

// function to update Employee's role



// Function that will get new employee information
// prompts user for employee's first name, last name 
// does an SQL query to provide user with the choices of current roles
// does an SQL query to provide user with options of current employees who may be their manager
function getNewEmployeeInfo (){

    inquirer.prompt([

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
    ])
    // then store first name and last name 
    // do an sql query to find all current roles
    .then(answer => {
    const criteria = [answer.first_name, answer.last_name]
    const roleSql = `SELECT roles.id, roles.title FROM roles`;
    db.query(roleSql, (err, result) =>{
        const roles = result.map(({id, title}) => ({name: title, value:id}));
    // prompt user for what role the employee has given the results from the SQL query
        inquirer.prompt([
        {
            type: 'list',
            name: 'role',
            message: "What is the employee's role?",
            choices: roles

        },
       ])      
    // Then storing the role and pushing data into criteria for employee
    // then sensing SQL query to find all employee names and their IDs
    // and offering those employee names as possible managers for the new employee
    .then ( rolechoice  => {
        const role = rolechoice.role;
        criteria.push(role);
        const managerSQL = `SELECT * FROM employees`;
        db.query(managerSQL, (err, data) => {
            const managers = data.map(({id, first_name, last_name}) => ({name: first_name + " " + last_name, value:id}));
        inquirer.prompt([
            {
            type: 'list',
            name: 'manager',
            message: "Who is the employee's manager?",
            choices: managers
            }
        ])
        // then storing the choice and pushing to the employee criteria 
        // doing another SQL query to insert all of the user information into
        // the employees database
        .then (managerChoice => {
            const manager = managerChoice.manager;
            criteria.push(manager);
            const sql = `INSERT INTO employees (first_name, last_name, role_id, manager_id)
            VALUES (?,?,?,?)`
            db.query(sql, criteria, (err, result) => 
                {
                    if (err) {
                        res.status(500).json({error: err.message});
                        return;
                    }
            console.log("You have added the new employee");
            getEmployees()
            showOrAddData();
        });
        });
    });
});
});
});
}
// function to validate the choice of the main menu each time it is displayed
// then will call on appropriate function based on what the choice is equal to

function validateChoice(choice) {
    if(choice === '["View All Employees"]') {
        console.log("You chose to show all employees");
        getEmployees();
        return;
    }  else if (choice === '["Add Employee"]') {
        console.log("You chose to add an employee");
        getNewEmployeeInfo();
        return;
    } else if (choice === '["Update Employee Role"]'){
        console.log("You have chosen to update an employee's role");
        updateEmployeeRole();
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

showOrAddData()
