const { User } = require('../models');
const jwt = require('jsonwebtoken')
const secret = process.env.JWT_SECRET || 'unapalabrasecreta';
const bcrypt = require('bcryptjs');

class Users {

    //GET - Return all Users in the DB

    async findAllUsers() {
        return User.findAll();
    };

    //POST - Sign Up in the Db

    async signUpUser(user) {
        let email = user.email
        const userFound = await User.findOne({ where: {email}})
        if(userFound){
            throw new Error('Email already registered')
        }
        user.password = await bcrypt.hash(user.password, 10)
        return User.create(user)
    };

    //POST - Login 

    async login(email, password) {
        const user = await User.findOne({ where: { email }})
        if (!user) {
            throw new Error('Email does not exist')
        }
        if (!await bcrypt.compare(password, user.password)) {
            throw new Error('Password incorrect')
        }
        const payload = {
            userId: user.id,
            tokenCreationDate: new Date,
        }
        let token = jwt.sign(payload, secret);
        return {user, token}
    }

    // PUT - Update a User

    async updateUser(id, update) {
        const user = await User.findOne({where: {id}})
        return await user.update(update);
    }

};

let userController = new Users();
module.exports = userController;