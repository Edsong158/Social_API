const router = require('express').Router();
const { handleRouteError } = require('../helpers');
const { User, Thought } = require('../../models');

// Get all thoughts
router.get('/thoughts', async (req, res) => {
    try {
        const thoughts = await Thought.find();
        if (!thoughts) {
            return res.status(404).json({
                message: 'NO thoughts were found',
            });
        }
        return res.json(thoughts); 
    } catch (err) {
        handleRouteError(err, res);
        
    }
});

// Find thoughts by ID
router.get('/thoughts/:thought_id', async ({ params: { thought_id } }, res) => {
    try {
        const thought = await Thought.findById(thought_id);

        if (!thought) {
            return res.status(404).json({
                message: 'Thought could not be found',
            });
        }
        return res.json(thought);
    } catch (err) {
        handleRouteError(err, res);
        
    }
});

// Route to post new thought
router.post('/thoughts', async ({ body: { thoughtText, username, userId } }, res) => {
    try {
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
        if(!updateUser){
            return res.status(404).json({
                message: 'User not found' 
            });
        }

        res.status(404).json(thought);
    } catch (err) {
        handleRouteError(err, res);
        
    }
});

// Update thought by ID
router.put('thought/:thought_id', async ({params:{thought_id}, body: {thoughtText}}, res) => {
    try {
        
        if(!thoughtText){
            return res.status(400).json({
                message: 'No thought text provided' 
            });
        }
        const updateThought = await Thought.findByIdAndUpdate(
            thought_id,
            {
                $set: {
                    thoughtText
                } 
            }, { new: true, 
                runValidators: true 
            });

          res.json(updateThought)  
    } catch (err) {
        handleRouteError(err, res);
        
    }
}); 

// Delete Thought by id 
router.delete('/thoughts/:thought_id', async ({params: {thought_id}}, res) => {
 try {
    const deleteThought = await Thought.findByIdAndDelete(thought_id)

    if(!deleteThought){
        return res
        .status(404)
        .json({ message: 'Thought could not be delete'});
    }
    res.json({
        message: 'Thought delete',
        deleteThought
    })
 } catch (err) {
    handleRouteError(err, res)
    
 }
});


// Create a Recation
router.post('/thoughts/:thought_id/reactions', async (req, res) => {
    try {
        const reaction = await Thought.findByIdAndUpdate(req.params.thought_id, {
            $push: {
                reactions: req.body
            }
        }, {
            runValidators: true,
            new: true
        });

        res.json(reaction);
    } catch (err) {
        handleRouteError(err, res)

    }
});

// Delete a reaction
router.delete('/thoughts/:thought_id/reactions/reaction_id', async ({ params: { thought_id, reaction_id } }, res) => {
    try {
        const updateThought = await Thought.findByIdAndUpdate(
            thought_id,
            {
                $pull: {
                    reactions: { _id: reaction_id }
                }
            }, { new: true })

        if (!updateThought) {
            return res.status(404).json({
                message: 'Could not delete Reaction',
            });
        }

        res.json({
            message: 'Reaction deleted successfully', updateThought
        })
    } catch (err) {
        handleRouteError(err, res);

    }
});



module.exports = router;