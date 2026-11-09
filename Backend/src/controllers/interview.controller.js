
const pdfParse = require("pdf-parse");

const generateInterviewReport = require("../service/ai.service");
const interviewReportModel = require("../models/interviewReport.model");

async function generateInterviewReportController(req, res) {
    let parser;

    try {
        // 1. Validate uploaded resume
        if (!req.file) {
            return res.status(400).json({
                message: "Please upload your resume in PDF format"
            });
        }

        // 2. Extract details from request body
        const { selfDescription, jobDescription } = req.body;

        if (!selfDescription || !jobDescription) {
            return res.status(400).json({
                message: "Self description and job description are required"
            });
        }

        // 3. Extract text from uploaded PDF
        const pdfBuffer = req.file.buffer;

        parser = new pdfParse.PDFParse({
            data: new Uint8Array(pdfBuffer)
        });

        const pdfData = await parser.getText();
        const resumeContent = pdfData.text.trim();

        if (!resumeContent) {
            return res.status(400).json({
                message: "Unable to extract text from the uploaded PDF"
            });
        }

        // 4. Generate interview report using Gemini AI
        const interviewReportByAi = await generateInterviewReport({
            resume: resumeContent,
            selfDescription,
            jobDescription
        });

        // 5. Save generated report in MongoDB
        const interviewReport = await interviewReportModel.create({
            user: req.user.userId,
            resume: resumeContent,
            selfDescription,
            jobDescription,
            ...interviewReportByAi
        });

        // 6. Send response
        return res.status(201).json({
            message: "Interview report generated successfully",
            interviewReport
        });

    } catch (error) {
        console.error("Interview report generation failed:", error);

        return res.status(500).json({
            message: "Failed to generate interview report",
            error: error.message
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

module.exports = { generateInterviewReportController };
