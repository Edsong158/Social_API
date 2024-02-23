const express = require('express');
const router = express.Router();
const thought_controller = require('../../controllers/thought.controller');

// Get all thoughts
router.get('/thoughts', thought_controller.getAllThoughts);

// Find thoughts by ID
router.get('/thoughts/:thought_id', thought_controller.getThoughtById);

// Route to post new thought
router.post('/thoughts', thought_controller.createThought);

// Update thought by ID
router.put('/thought/:thought_id', thought_controller.updateThoughtById);

// Delete Thought by id
router.delete('/thoughts/:thought_id', thought_controller.deleteThoughtById);

// Create a Reaction
router.post('/thoughts/:thought_id/reactions', thought_controller.createReaction);

// Delete a reaction
router.delete('/thoughts/:thought_id/reactions/:reaction_id', thought_controller.deleteReaction);

module.exports = router;
