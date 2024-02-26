const express = require('express');
const router = express.Router();
const user_controller = require('../../controllers/user.controller');
// Create a user
router.post('/user', user_controller.createUser);

// Get all users
router.get('/users', user_controller.getAllUsers);

// add a friend 
router.post('/users/:user_id/friends/:friend_id', user_controller.addFriend);

// delete a friend
router.delete('/users/:user_id/friends/:friend_id', user_controller.removeFriend);

// get user by ID
router.get('/user/:user_id', user_controller.getUserById);

// update user by ID
router.put('/users/:user_id', user_controller.updateUserById);

// delete user by ID
router.delete('/user/:id', user_controller.deleteUserById);

module.exports = router;
