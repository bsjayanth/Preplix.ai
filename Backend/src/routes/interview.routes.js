
const express = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const interviewController = require("../controllers/interview.controller");
const upload = require("../middleware/file.middleware");

const interviewRouter = express.Router();


/**
 * @route POST /api/interview/
 * @description generate new interview report on the basis of user self description,
 * resume pdf and job description.
 * @access private
 */
interviewRouter.post(
    "/",
    authMiddleware.authUser,
    upload.single("resume"),
    interviewController.generateInterviewReportController
);

/**
 * @route GET /api/interview/:interviewId
 * @description Retrieve an existing interview report using its ID.
 * @access Private
 */
interviewRouter.get(
    "/report/:interviewId",
    authMiddleware.authUser,
    interviewController.getInterviewReportByIdController
);

/**
 * @route GET /api/interview/
 * @description Get all interview reports of logged-in user.
 * @access Private
 */
interviewRouter.get(
    "/",
    authMiddleware.authUser,
    interviewController.getAllInterviewReportsController
);

module.exports = interviewRouter;
