const router = require('express').Router();
const{ 
    userNew, 
    userFindAll,
    userFindByID, 
    userUpdate, 
    userRemove, 
    userRemove, 
    userRemove
 } = require('../../controllers/user-controllers');

router
    .route('/')
    .get(userFindAll)
    .post(userNew);

router
    .route('/:id')
    .get(userFindByID)
    .put(userUpdate)
    .delete(userRemove);

router
    .route('/:userId/friends/:friendId')
    .post(userRemove)
    .delete(userRemove);

module.exports = router;