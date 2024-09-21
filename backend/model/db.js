const mysql = require('mysql');
const connectDb = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "", 
    database: "next"
});

connectDb.connect((err) => {
    if (err) {
        console.error("Error connecting to the database:", err.sqlMessage);
    } else {
        console.log("Database connected successfully");
    }
});

module.exports = connectDb;
