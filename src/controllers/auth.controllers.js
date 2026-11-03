const userModel = require("../models/user.model")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")


/**4
 * @name registerUserController
 * @description Controller to handle user registration,expects username,email and password in the request body
 * @access Public
 */
async function registerUserController(req, res) {

    const { username, email, password } = req.body

    if (!username || !email || !password) {
        return res.status(400).json({ message: "Username, email, and password are required" })
    }

    const isUserAlreadyExists = await userModel.findOne({
         $or: [{ username }, { email }]
    })

    if (isUserAlreadyExists) {

        /* If the user already exists, return a 400 Bad Request response with an appropriate message. */
        return res.status(400).json({ message: "Account already exists with this username or email" })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await userModel.create({
        username,
        email,
        password: hashedPassword
    })

    const token = jwt.sign({ userId: user._id , username: user.username}, process.env.JWT_SECRET, { expiresIn: "1d" })

    res.cookie("token", token)

    res.status(201).json({
        message: "User registered successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    })       
}



/**
 * @name loginUserController
 * @description Controller to handle user login, expects email and password in the request body
 * @access Public
 */
async function loginUserController(req, res) {
    const { email, password } = req.body

    const user = await userModel.findOne({ email })

    if (!user) {
        return res.status(400).json({ message: "Invalid email or password" })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
        return res.status(400).json({ message: "Invalid email or password" })
    }

    const token = jwt.sign({ userId: user._id , username: user.username}, process.env.JWT_SECRET, { expiresIn: "1d" })

    res.cookie("token", token)  
    res.status(200).json({
        message: "User logged in successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    })
}

 

module.exports = {
    registerUserController,
    loginUserController
 }