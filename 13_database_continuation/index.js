import mysql from "mysql2";
import dotenv from "dotenv";
import express from "express";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3333;
// const MYSQL_URI = process.env.MYSQL_URI;
const MYSQL_HOST = process.env.MYSQL_HOST;
const MYSQL_USER = process.env.MYSQL_USER;
const MYSQL_PASSWORD = process.env.MYSQL_PASSWORD;
const MYSQL_DATABASE = process.env.MYSQL_DATABASE;

// const pool = mysql.createPool({
// });
// pool.getConnection((err, connection) => {
//     connection.query("SELECT * FROM users", (err, results) => { });
// });

const connection = mysql.createConnection({
  host: MYSQL_HOST,
  user: MYSQL_USER,
  password: MYSQL_PASSWORD,
  database: MYSQL_DATABASE,
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL: ", err);
    return;
  }
  console.log("Connected to MySQL!");
  connection.query(
    "CREATE TABLE IF NOT EXISTS users (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), email VARCHAR(255))",
    (err) => {
      if (err) {
        console.error("Error creating table: ", err);
        return;
      }
      console.log("Table created successfully!");
    }
  );
});

// Middleware
app.use(express.json());

app.get("/users", async (req, res) => {
  connection.query("SELECT * FROM users", (err, results) => {
    if (err) {
      console.error("Error querying MySQL: ", err);
      return;
    }
    res.json(results);
  });
});

app.post("/users", async (req, res) => {
  const {
    first_name,
    last_name,
    email,
    password,
    hobbies,
    createdAt,
    updatedAt,
  } = req.body;
  connection.query(
    "INSERT INTO users (first_name, last_name, email, password, hobbies, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?)",
    [first_name, last_name, email, password, hobbies, createdAt, updatedAt],
    (err, results) => {
      if (err) {
        console.error("Error querying MySQL: ", err);
        return;
      }
      res.json({
        id: results.insertId,
        first_name,
        last_name,
        email,
        password,
        hobbies,
        createdAt,
        updatedAt,
      });
    }
  );
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
