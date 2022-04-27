const router = require('express').Router();
const{ 
    userNew, 
    userFindAll,
    userFindByID, 
    userUpdate, 
    userRemove, 
    friendNew, 
    friendRemove
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
    .route('/:id/friends/:friendId')
    .post(friendNew)
    .delete(friendRemove);

module.exports = router;