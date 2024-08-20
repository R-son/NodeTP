const db = require('../database/database');

exports.getAllUsers = async (req, res) => {
    try {
        const rows = await db.pool.query('SELECT * FROM Users'); 
        res.status(200).json(rows);
        // res.json(rows);
    }
    catch (err) {
        console.error(err);
    }
}

exports.getUserById = async (req, res) => {
    try {
        const user = await db.pool.query('SELECT * FROM Users WHERE id = ?", [id]');
        res.json(user);
        res.status(200).json(user);
    }
    catch (err) {
        console.error(err);
    }
}