const { Router } = require('express')
const authController = require('../controllers/auth.controllers')
const authMiddleware = require('../middleware/auth.middleware')
const authRouter = Router()

/**
 * @route POST /api/auth/register
 * @description Register a new user
 * @access Public
 */
authRouter.post('/register',authController.registerUserController) 


/**
 * @route POST /api/auth/login
 * @description Login a user
 * @access Public
 */
authRouter.post("/login", authController.loginUserController)

/**
 * @route GET /api/auth/logout
 * @description Clear token from the user's cookies and add the token to the blacklist
 * @access Public
 */
authRouter.get("/logout",authController.logoutUserController)



/**
 * @route GET /api/auth/get-me
 * @description Get the details of the current logged-in user       
 * @access Private
 */
authRouter.get("/get-me",authMiddleware.authUser, authController.getMeController)




module.exports = authRouter

