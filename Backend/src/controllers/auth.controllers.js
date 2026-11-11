
const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const blacklistTokenModel = require("../models/blacklist.model");

/**
 * Configures authentication cookies for local development and production.
 * Cross-site frontend/backend requests require SameSite=None in production.
 */
const authCookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    path: "/"
};

/**
 * Registers a new user, hashes their password, generates a JWT
 * and stores it in an HTTP-only authentication cookie.
 */
async function registerUserController(req, res) {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({
                message: "Username, email, and password are required"
            });
        }

        const isUserAlreadyExists = await userModel.findOne({
            $or: [{ username }, { email }]
        });

        if (isUserAlreadyExists) {
            return res.status(400).json({
                message: "Account already exists with this username or email"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await userModel.create({
            username,
            email,
            password: hashedPassword
        });

        const token = jwt.sign(
            {
                userId: user._id,
                username: user.username
            },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        res.cookie("token", token, {
            ...authCookieOptions,
            maxAge: 24 * 60 * 60 * 1000
        });

        return res.status(201).json({
            message: "User registered successfully",
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });

    } catch (error) {
        console.error("User registration failed:", error);

        return res.status(500).json({
            message: "Registration failed"
        });
    }
}

/**
 * Authenticates an existing user, verifies their password,
 * generates a JWT and stores it in an HTTP-only cookie.
 */
async function loginUserController(req, res) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required"
            });
        }

        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(400).json({
                message: "Invalid email or password"
            });
        }

        const isPasswordValid = await bcrypt.compare(
            password,
            user.password
        );

        if (!isPasswordValid) {
            return res.status(400).json({
                message: "Invalid email or password"
            });
        }

        const token = jwt.sign(
            {
                userId: user._id,
                username: user.username
            },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        res.cookie("token", token, {
            ...authCookieOptions,
            maxAge: 24 * 60 * 60 * 1000
        });

        return res.status(200).json({
            message: "User logged in successfully",
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });

    } catch (error) {
        console.error("User login failed:", error);

        return res.status(500).json({
            message: "Login failed"
        });
    }
}

/**
 * Logs out the authenticated user by blacklisting their JWT
 * and clearing the authentication cookie.
 */
async function logoutUserController(req, res) {
    try {
        const token = req.cookies?.token;

        if (!token) {
            return res.status(401).json({
                message: "No authentication token found"
            });
        }

        await blacklistTokenModel.create({ token });

        res.clearCookie("token", authCookieOptions);

        return res.status(200).json({
            message: "User logged out successfully"
        });

    } catch (error) {
        console.error("User logout failed:", error);

        return res.status(500).json({
            message: "Logout failed"
        });
    }
}

/**
 * Retrieves the currently authenticated user's details
 * using the user ID stored in the verified JWT.
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
        console.error("Failed to retrieve user:", error);

        return res.status(500).json({
            message: "Failed to retrieve user"
        });
    }
}

module.exports = {
    registerUserController,
    loginUserController,
    logoutUserController,
    getMeController
};
