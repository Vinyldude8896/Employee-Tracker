const express = require('express');
const router = express.Router();
const db = require('../../db/connection');

// get all employees

// const showAllEmployees = function () {
//     console.log ("entered showAllEmployees Function")
// }
router.get('/employees', (req, res) => {

    const sql = `SELECT * FROM employees`;

    db.query(sql, (err, rows) =>{
        if (err) {
            res.status(500).json({error: err.message});
            return;
        }
    res.json({
        message:'sucess',
        data: rows
    });
});
});

module.exports = router;
module.exports = showAllEmployees;