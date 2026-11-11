
const pdfParse = require("pdf-parse");
const mongoose = require("mongoose");

const generateInterviewReport = require("../service/ai.service");
const interviewReportModel = require("../models/interviewReport.model");

/**
 * @description Controller to generate an interview report using resume, self-description and job description.
 */
async function generateInterviewReportController(req, res) {
    let parser;

    try {
        if (!req.file) {
            return res.status(400).json({
                message: "Please upload your resume in PDF format"
            });
        }

        if (req.file.mimetype !== "application/pdf") {
            return res.status(400).json({
                message: "Only PDF files are accepted"
            });
        }

        const { selfDescription, jobDescription } = req.body;

        if (!selfDescription?.trim() || !jobDescription?.trim()) {
            return res.status(400).json({
                message: "Self description and job description are required"
            });
        }

        parser = new pdfParse.PDFParse({
            data: new Uint8Array(req.file.buffer)
        });

        const pdfData = await parser.getText();
        const resumeContent = pdfData.text.trim();

        if (!resumeContent) {
            return res.status(400).json({
                message: "Unable to extract text from the uploaded PDF"
            });
        }

        const interviewReportByAi = await generateInterviewReport({
            resume: resumeContent,
            selfDescription: selfDescription.trim(),
            jobDescription: jobDescription.trim()
        });

        const interviewReport = await interviewReportModel.create({
            user: req.user.userId,
            resume: resumeContent,
            selfDescription: selfDescription.trim(),
            jobDescription: jobDescription.trim(),
            ...interviewReportByAi
        });

        return res.status(201).json({
            message: "Interview report generated successfully.",
            interviewReport
        });

    } catch (error) {
        console.error("Interview report generation failed:", error);

        return res.status(500).json({
            message: "Failed to generate interview report.",
            error: process.env.NODE_ENV === "development"
                ? error.message
                : undefined
        });

    } finally {
        if (parser) {
            try {
                await parser.destroy();
            } catch (error) {
                console.error("PDF parser cleanup failed:", error.message);
            }
        }
    }
}

/**
 * @description Controller to get an interview report using interviewId.
 */
async function getInterviewReportByIdController(req, res) {
    try {
        const { interviewId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(interviewId)) {
            return res.status(400).json({
                message: "Invalid interview report ID."
            });
        }

        const interviewReport = await interviewReportModel.findOne({
            _id: interviewId,
            user: req.user.userId
        });

        if (!interviewReport) {
            return res.status(404).json({
                message: "Interview report not found."
            });
        }

        return res.status(200).json({
            message: "Interview report fetched successfully.",
            interviewReport
        });

    } catch (error) {
        console.error("Failed to retrieve interview report:", error);

        return res.status(500).json({
            message: "Failed to retrieve interview report.",
            error: process.env.NODE_ENV === "development"
                ? error.message
                : undefined
        });
    }
}

/**
 * @description Controller to get all interview reports of logged in user.
 */
async function getAllInterviewReportsController(req, res) {
    try {
        const interviewReports = await interviewReportModel.find({
            user: req.user.userId
        }).sort({ createdAt: -1 });

        return res.status(200).json({
            message: "Interview reports fetched successfully.",
            totalReports: interviewReports.length,
            interviewReports
        });

    } catch (error) {
        console.error("Failed to retrieve interview reports:", error);

        return res.status(500).json({
            message: "Failed to retrieve interview reports.",
            error: process.env.NODE_ENV === "development"
                ? error.message
                : undefined
        });
    }
}

module.exports = {
    generateInterviewReportController,
    getInterviewReportByIdController,
    getAllInterviewReportsController
};
