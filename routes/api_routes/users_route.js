const express = require('express');
const router = express.Router();
const user_controller = require('../../controllers/user.controller');

router.post('/user', user_controller.createUser);

router.get('/users', user_controller.getAllUsers);

router.post('/users/:user_id/friends/:friend_id', user_controller.addFriend);

router.delete('/users/:user_id/friends/:friend_id', user_controller.removeFriend);

router.get('/user/:user_id', user_controller.getUserById);

router.put('/users/:user_id', user_controller.updateUserById);

router.delete('/user/:id', user_controller.deleteUserById);

module.exports = router;
