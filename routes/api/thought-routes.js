const router = require('express').Router();
const{ 
    thoughtNew,
    thoughtFindAll,
    thoughtFindByID,  
    thoughtUpdate, 
    thoughtRemove,
    reactionNew,
    reactionRemove
} = require('../../controllers/thought-controllers');

//api/thoughts
router
    .route('/')
    .get(thoughtFindAll)
    .post(thoughtNew);

router
    .route('/:id')
    .get(thoughtFindByID)
    .put(thoughtUpdate)
    .delete(thoughtRemove);

router
    .route('/:thoughtId/reactions')
    .post(reactionNew);

router
    .route('/:thoughtId/reactions/:reactionId')
    .delete(reactionRemove);

module.exports = router;