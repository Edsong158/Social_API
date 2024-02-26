const { handleRouteError } = require('../routes/helpers');
const { User, Thought } = require('../models');

const getAllThoughts = async (req, res) => {
    try {
        const thoughts = await Thought.find();
        if (!thoughts || thoughts.length === 0) {
            return res.status(404).json({
                message: 'No thoughts were found',
            });
        }
        return res.json(thoughts);
    } catch (err) {
        handleRouteError(err, res);
    }
};

const getThoughtById = async (req, res) => {
    try {
        const thought = await Thought.findById(req.params.thought_id);

        if (!thought) {
            return res.status(404).json({
                message: 'Thought could not be found',
            });
        }
        return res.json(thought);
    } catch (err) {
        handleRouteError(err, res);
    }
};

const createThought = async (req, res) => {
    try {
        const { thoughtText, username, userId } = req.body;
        const thought = await Thought.create({ thoughtText, username });

        const updateUser = await User.findByIdAndUpdate(
            userId,
            {
                $push: {
                    thoughts: thought._id,
                },
            },
            { new: true, runValidators: true }
        );
        if (!updateUser) {
            return res.status(404).json({
                message: 'User not found',
            });
        }

        res.json(thought);
    } catch (err) {
        handleRouteError(err, res);
    }
};

const updateThoughtById = async (req, res) => {
    try {
        const { thought_id } = req.params;
        const { thoughtText } = req.body;

        if (!thoughtText) {
            return res.status(400).json({
                message: 'No thought text provided',
            });
        }

        const updateThought = await Thought.findByIdAndUpdate(
            thought_id,
            {
                $set: {
                    thoughtText,
                },
            },
            { new: true, runValidators: true }
        );

        res.json(updateThought);
    } catch (err) {
        handleRouteError(err, res);
    }
};

const deleteThoughtById = async (req, res) => {
    try {
        const { thought_id } = req.params;
        const deleteThought = await Thought.findByIdAndDelete(thought_id);

        if (!deleteThought) {
            return res.status(404).json({ message: 'Thought could not be deleted' });
        }

        res.json({
            message: 'Thought deleted',
            deleteThought,
        });
    } catch (err) {
        handleRouteError(err, res);
    }
};

const createReaction = async (req, res) => {
    try {
        const reaction = await Thought.findByIdAndUpdate(
            req.params.thought_id,
            {
                $push: {
                    reactions: req.body,
                },
            },
            {
                runValidators: true,
                new: true,
            }
        );

        res.json(reaction);
    } catch (err) {
        handleRouteError(err, res);
    }
};

const deleteReaction = async (req, res) => {
    try {
        const { thought_id, reaction_id } = req.params;

        const updateThought = await Thought.findByIdAndUpdate(
            thought_id,
            {
                $pull: {
                    reactions: { _id: reaction_id },
                },
            },
            { new: true }
        );

        if (!updateThought) {
            return res.status(404).json({
                message: 'Could not delete Reaction',
            });
        }

        res.json({
            message: 'Reaction deleted successfully',
            updateThought,
        });
    } catch (err) {
        handleRouteError(err, res);
    }
};

module.exports = {
    getAllThoughts,
    getThoughtById,
    createThought,
    updateThoughtById,
    deleteThoughtById,
    createReaction,
    deleteReaction,
};
