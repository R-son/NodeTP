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
        const rows = await conn.query('SELECT * FROM users');
    }
    catch (err) {
        console.error(err);
    }
})
app.post('/users', async (req, res) => {
    try {
        const {name, email} = req.body;
        const conn = await pool.getConnection();
        const result = await conn.query("INSERT INTO users (name, email) VALUES (?, ?)", [name, email]);
    } catch (err) {
        console.error(err);
    }
});

app.put('/users/:id', async (req, res) => {
    try {
        const {name, email} = req.body;
        const {id} = req.params;
        const conn = await pool.getConnection();
        await conn.query("UPDATE users SET name = ?, email = ? WHERE id = ?", [name, email, id]);
    } catch (err) {
        console.error(err);
    }
});

app.delete('/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const conn = await pool.getConnection();
        await conn.query("DELETE FROM users WHERE id = ?", [id]);
    } catch (err) {
        console.error(err);
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
    } catch (err) {
        console.error(err);
    }
});

app.delete('/products/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const conn = await pool.getConnection();
        await conn.query("DELETE FROM products WHERE id = ?", [id]);
    } catch (err) {
        console.error(err);
    }
});

app.listen(3000, () => {});