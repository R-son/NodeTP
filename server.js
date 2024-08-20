require('dotenv').config()
const mariadb = require('mariadb');
const express = require ('express');
let cors = require('cors');
const app = express();
const pool = mariadb.createPool({
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PWD,
    database:process.env.DB_DTB,
})

app.use(express.json());
app.use(cors());

app.get('/users', async (req, res) => {
    let conn;
    try {
        conn = await pool.getConnection();
        const rows = await conn.query('SELECT id, username, email FROM Users'); 
        res.json(rows);
        conn.end();
    }
    catch (err) {
        console.error(err);
    }
})

app.post('/users', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const conn = await pool.getConnection();
        const result = await conn.query(
            "INSERT INTO Users (username, email, password) VALUES (?, ?, ?)",
            [username, email, password]
        );
        const insertedId = result.insertId.toString();
        res.status(201).json({ id: insertedId });
        conn.end();
    } catch (err) {
        console.error('Failed to add user:', err);
        res.status(500).send('Internal Server Error');
    }
});

app.put('/users/:id', async (req, res) => {
    let conn;
    try {
        const { username, email } = req.body;
        const { id } = req.params;
        conn = await pool.getConnection();
        const result = await conn.query("UPDATE Users SET username = ?, email = ?", [username, email]);
        if (result.affectedRows > 0) {
            res.sendStatus(200);
        } else {
            res.status(404).send('User not found');
        }
        conn.end();
    } catch (err) {
        console.error('Error updating user:', err);
        res.status(500).send('Internal Server Error');
    }
});


app.delete('/users/:id', async (req, res) => {
    let conn;
    try {
        const { id } = req.params;
        conn = await pool.getConnection();
        const result = await conn.query("DELETE FROM Users WHERE id = ?", [id]);
        if (result.affectedRows > 0) {
            res.sendStatus(200);
        } else {
            res.status(404).send('User not found');
        }
        conn.end();
    } catch (err) {
        console.error('Error deleting user:', err);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/products', async (req, res) => {
    try {
        const conn = await pool.getConnection();
        const rows = await conn.query("SELECT * FROM products");
    } catch (err) {
        console.error(err);
    }
});

app.post('/products', async (req, res) => {
    try {
        const {name, price} = req.body;
        const conn = await pool.getConnection();
        const result = await conn.query("INSERT INTO products (name, price) VALUES (?, ?)", [name, price]);
        conn.end();
    } catch (err) {
        console.error(err);
    }
});

app.put('/products/:id', async (req, res) => {
    try {
        const {name, price} = req.body;
        const {id} = req.params;
        const conn = await pool.getConnection();
        await conn.query("UPDATE products SET name = ?, price = ? WHERE id = ?", [name, price, id]);
        conn.end();
    } catch (err) {
        console.error(err);
    }
});

app.delete('/products/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const conn = await pool.getConnection();
        await conn.query("DELETE FROM products WHERE id = ?", [id]);
        conn.end();
    } catch (err) {
        console.error(err);
    }
});

app.listen(3001, () => {});