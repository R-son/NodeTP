const db = require('../database/database');

exports.getAllProducts = async (req, res) => {
    try {
        const rows = await db.pool.query('SELECT * FROM Products'); 
        res.status(200).json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch products' });
    }
};

exports.getProductById = async (req, res) => {
    try {
        const { id } = req.params; // Extract id from request parameters
        const [rows] = await db.pool.query('SELECT * FROM Products WHERE id = ?', [id]); // Correct SQL query syntax
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.status(200).json(rows[0]); // Respond with the first row (assuming id is unique)
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch product' });
    }
};