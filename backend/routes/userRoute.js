const express = require('express');
const jwt = require('jsonwebtoken');
const adminroll_route = express.Router();
const { userRegister,getuser,UserLogin,userUpdate,userDelete,userLogout } = require('../Controller/controller');

adminroll_route.post('/userRegister', userRegister);
adminroll_route.get('/getuser',getuser);
adminroll_route.post('/user-login', UserLogin)
adminroll_route.post('/user-logout', userLogout)
adminroll_route.put('/user-update/:firstname', userUpdate)
adminroll_route.delete('/user-delete/:firstname', userDelete)

module.exports = adminroll_route;
