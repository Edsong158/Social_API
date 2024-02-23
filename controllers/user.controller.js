const { User } = require('../models');
const { handleRouteError } = require('../routes/helpers');

const createUser = async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.json(user);
    } catch (err) {
        handleRouteError(err, res);
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        handleRouteError(err, res);
    }
};

const addFriend = async (req, res) => {
    try {
        const { user_id, friend_id } = req.params;
        const user = await User.findById(user_id);

        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        if (user.friends.includes(friend_id)) {
            return res.status(400).json({ message: "They are already friends" });
        }

        if (user_id === friend_id) {
            return res.status(400).json({ message: "You cannot add the user to its own friends list" });
        }

        const updatedUser = await User.findByIdAndUpdate(
            user_id,
            { $push: { friends: friend_id } },
            { new: true }
        );

        return res.json({
            message: "Friend added successfully.",
            updatedUser,
        });
    } catch (err) {
        handleRouteError(err, res);
    }
};

const removeFriend = async (req, res) => {
    try {
        const { user_id, friend_id } = req.params;
        const user = await User.findById(user_id);

        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        if (!user.friends.includes(friend_id)) {
            return res.status(400).json({ message: "They are not friends" });
        }

        if (user_id === friend_id) {
            return res.status(400).json({ message: "User ID and Friend ID are the same." });
        }

        const updatedUser = await User.findByIdAndUpdate(
            user_id,
            { $pull: { friends: friend_id } },
            { new: true }
        );

        return res.json({
            message: "Friend deleted successfully.",
            updatedUser,
        });
    } catch (err) {
        handleRouteError(err, res);
    }
};

const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.user_id);
        if (!user) return res.status(404).json({ message: 'User with that ID could not be found' });
        res.json(user);
    } catch (err) {
        handleRouteError(err, res);
    }
};

const updateUserById = async (req, res) => {
    const { email, password, newPassword } = req.body;

    try {
        if (email) {
            const user = await User.findByIdAndUpdate(req.params.user_id, {
                $set: {
                    email: email
                }
            }, { new: true });

            res.json(user);
        }

        if (password) {
            const user = await User.findById(req.params.user_id);

            const pass_valid = await user.validatePass(password);

            if (!pass_valid) return res.status(401).json({
                message: 'The old password is incorrect'
            });

            if (!user) return res.status(404).json({
                message: 'User with that ID could not be found'
            });

            user.password = newPassword;

            user.save();

            res.json(user);
        }

    } catch (err) {
        handleRouteError(err, res);
    }
};

const deleteUserById = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);

        res.json({
            message: 'User deleted successfully'
        });
    } catch (err) {
        handleRouteError(err, res);
    }
};

module.exports = {
    createUser,
    getAllUsers,
    addFriend,
    removeFriend,
    getUserById,
    updateUserById,
    deleteUserById,
};
