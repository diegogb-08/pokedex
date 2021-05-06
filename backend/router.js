const router = require('express').Router();

const userRouter = require('./routers/user.routers')


// REST RESOURCES
router.use('/user', userRouter);


module.exports = router;