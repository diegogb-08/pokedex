const router = require('express').Router();
const clientController = require('../controllers/user.controller');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth')
// const authAdmin = require('../middlewares/authAdmin')

// API routes

//GET - Return all Users in the DB

router.get('/', async(req, res) => {
    try {
        res.json(await clientController.findAllUsers())
    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
});

//POST - SignIn a new User in the DB

router.post('/', async(req, res) => {

    try {
        res.json(await clientController.signUpUser(req.body));
    } catch (err) {
        return res.status(409).json({
            message: err.message
        });
    }
});

//POST - Login a User in the DB

router.post('/login', async(req, res) => {
    try {
        const { email, password } = req.body;
        const jwt = await clientController.login(email, password);
        const token = jwt.token
        const user = jwt.user
        res.json({ token, user })
    } catch (error) {
        return res.status(409).json({
            message: error.message
        });
    }
});


router.put('/:id', auth, async(req, res) => {
    try{
        const id = req.params.id;
        const user = await clientController.updateUser(id, req.body)
        res.json(user)
    }catch (error){
        return res.status(500).json({
            message: error.message
        });
    }
})

module.exports = router;