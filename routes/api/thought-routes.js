const router = require('express').Router();
const {
    getAllThought,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    removeReaction
} = require('../../controllers/thought-controller');

//set up GET all and POST at /api/thoughts
router
    .route('/')
    .get(getAllThought)
    .post(createThought)

//set up GET one, PUT, and DELETE at /api/thoughts/:id
router
    .route('/:id')
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought)

//set up add reaction /api/thoughts/:thoughtId/reactions
router
    .route('/:thoughtId/reaction')
    .post(addReaction)

//set up remove reaction
router
    .route('/:thoughtId/reaction/:reactionId')
    .delete(removeReaction)

module.exports = router;