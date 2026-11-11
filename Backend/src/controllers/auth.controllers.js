const userModel = require("../models/user.model")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const blacklistTokenModel = require("../models/blacklist.model")    

const authCookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/"
}

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

    res.cookie("token", token, {
        ...authCookieOptions,
        maxAge: 24 * 60 * 60 * 1000
    })

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

    res.cookie("token", token, {
        ...authCookieOptions,
        maxAge: 24 * 60 * 60 * 1000
    })
    res.status(200).json({
        message: "User logged in successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    })
}
/**
 * @name logoutUserController
 * @description Controller to handle user logout, clears the token from the user's cookies and adds the token to the blacklist
 * @access Public       
 */
async function logoutUserController(req, res) {
    try {
        const token = req.cookies?.token

        if (!token) {
            return res.status(401).json({
                message: "No authentication token found"
            })
        }

        await blacklistTokenModel.create({ token })

        res.clearCookie("token", authCookieOptions)

        return res.status(200).json({
            message: "User logged out successfully"
        })

    } catch (error) {
        return res.status(500).json({
            message: "Logout failed",
            error: error.message
        })
    }
}


/**
 * @name getMeController
 * @description get the current logged-in user's details
 * @access Private
 */
async function getMeController(req, res) {
    try {

        const user = await userModel.findById(req.user.userId);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        return res.status(200).json({
            message: "User retrieved successfully",
            user: {
                userId: user._id,
                username: user.username,
                email: user.email
            }
        });

    } catch (error) {
        return res.status(500).json({
            message: "Failed to retrieve user",
            error: error.message
        });
    }
}


 

module.exports = {
    registerUserController,
    loginUserController,
    logoutUserController,
    getMeController
}
