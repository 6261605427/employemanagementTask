const connectDb = require('../model/db')
const jwt = require('jsonwebtoken')

const getuser = (req, res) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    jwt.verify(token, "anupam", (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: "Invalid token" });
        }

        const userRole = decoded.roll;

        if (userRole === 'admin') {
            const SqlQuery = 'SELECT * FROM user';
            connectDb.query(SqlQuery, (err, results) => {
                if (err) {
                    return res.status(500).json({ message: "Error fetching users", error: err });
                }
                return res.status(200).json(results); 
            });
        } else {
            const SqlQuery = 'SELECT * FROM user WHERE firstname = ?';
            connectDb.query(SqlQuery, [decoded.firstname], (err, result) => {
                if (err || result.length === 0) {
                    return res.status(404).json({ message: "User not found" });
                }
                return res.status(200).json(result[0]); 
            });
        }
    });
};


const userRegister =  (req, res) => {
    try {
        const data = req.body;
       
        const sqlQuery = 'INSERT INTO user SET ?'
        connectDb.query(sqlQuery, data, (err, result) => {
            if (err) {
               res.json(err)
            }
            else{
                res.json(result)
                                                           
            }
        }
        )
       
    } catch (error) {
        res.send({ status: 500, Error: error.message })
    }
}


const userUpdate = (req, res) => {

        const { firstname, lastname, location } = req.body;
console.log(req.body)
        const SqlQuery = 'UPDATE user SET firstname = ?, lastname = ?, location = ? WHERE firstname = ?';
        connectDb.query(SqlQuery, [firstname, lastname, location, req.params.firstname], (err, results) => {
            if (err) {
                return res.status(500).json({ message: "Error updating user", error: err });
            }
            return res.status(200).json({ message: "User updated successfully!" });
        });
    
}


const userDelete = (req, res) => {
        const SqlQuery = 'DELETE FROM user WHERE firstname = ?';
        connectDb.query(SqlQuery, [req.params.firstname], (err, results) => {
            if (err) {
                return res.status(500).json({ message: "Error deleting user", error: err });
            }

            if (results.affectedRows === 0) {
                return res.status(404).json({ message: "User not found" });
            }

            return res.status(200).json({ message: "User deleted successfully!" });
        });
    }



const UserLogin = (req, res) => {
    const { firstname, roll } = req.body;

    if (!firstname || !roll) {
        return res.status(400).json({ message: "Firstname and role are required" });
    }

    const SqlQuery = 'SELECT * FROM user WHERE firstname = ?';

    connectDb.query(SqlQuery, [firstname], (err, result) => {
        if (err || result.length === 0) {
            return res.status(401).json({ message: "User Not Found", error: err });
        }

        const user = result[0]; 

        if (user.roll !== roll) {
            return res.status(401).json({ message: "Selected role does not match user role" });
        }

        const token = jwt.sign(
            { firstname: user.firstname, roll: user.roll }, 
            "anupam", 
            { expiresIn: "1d" } 
        );

        res.cookie('token', token, { httpOnly: true });
        res.status(200).json({ message: "User logged in successfully", firstname: user.firstname, roll: user.roll });
    });
};

const userLogout = (req, res) => {
    res.clearCookie('authToken', { path: '/' });
    return res.status(200).json({ message: 'Logout successful' });
  }

const verifyUser=(req,res)=>{
    return res.status(200).json({
        message:"User Verified",
        uid:req.uid,
        roles:req.roles
    })
}
module.exports = {userRegister, getuser, userUpdate, UserLogin,userDelete,userLogout, verifyUser}