
const mongoose = require("mongoose");

/**
 * ============================================================
 * INTERVIEW REPORT MODEL
 * ============================================================
 *
 * Stores AI-generated interview reports associated with users.
 *
 * DOCUMENT STRUCTURE:
 *
 * 1. User Reference
 *    user: ObjectId -> User
 *
 * 2. Candidate Information
 *    jobDescription: String
 *    resume: String
 *    selfDescription: String
 *
 * 3. Job Match Analysis
 *    matchScore: Number (0–100)
 *
 * 4. Technical Questions
 *    technicalQuestions: [{
 *        question: String,
 *        intention: String,
 *        answer: String
 *    }]
 *    Exactly 10 questions.
 *
 * 5. Behavioral Questions
 *    behavioralQuestions: [{
 *        question: String,
 *        intention: String,
 *        answer: String
 *    }]
 *    Exactly 5 questions.
 *
 * 6. Skill Gap Analysis
 *    skillGaps: [{
 *        skill: String,
 *        severity: "low" | "medium" | "high"
 *    }]
 *
 * 7. Adaptive Preparation Roadmap
 *    preparationPlan: {
 *        totalDays: Number (5–30),
 *        difficulty: "beginner" | "intermediate" | "advanced",
 *        dailyCommitmentHours: Number (1–12),
 *        days: [{
 *            day: Number,
 *            focus: String,
 *            tasks: [String]
 *        }]
 *    }
 *
 * 8. Timestamps
 *    createdAt: Date
 *    updatedAt: Date
 *
 * ============================================================
 */


// ============================================================
// 1. TECHNICAL QUESTION SCHEMA
// ============================================================

const technicalQuestionSchema = new mongoose.Schema({

    question: {
        type: String,
        required: [true, "Technical question is required"]
    },

    intention: {
        type: String,
        required: [true, "Intention is required"]
    },

    answer: {
        type: String,
        required: [true, "Answer is required"]
    }

}, {
    _id: false
});



// 2. BEHAVIORAL QUESTION SCHEMA


const behavioralQuestionSchema = new mongoose.Schema({

    question: {
        type: String,
        required: [true, "Behavioral question is required"]
    },

    intention: {
        type: String,
        required: [true, "Intention is required"]
    },

    answer: {
        type: String,
        required: [true, "Answer is required"]
    }

}, {
    _id: false
});



// 3. SKILL GAP SCHEMA


const skillGapSchema = new mongoose.Schema({

    skill: {
        type: String,
        required: [true, "Skill is required"]
    },

    severity: {
        type: String,
        enum: ["low", "medium", "high"],
        required: [true, "Severity is required"]
    }

}, {
    _id: false
});


// ============================================================
// 4. PREPARATION DAY SCHEMA
// ============================================================

/**
 * Represents one day of the adaptive preparation roadmap.
 *
 * Each day contains:
 * - Sequential day number
 * - Primary preparation focus
 * - Array of actionable preparation tasks
 */

const preparationDaySchema = new mongoose.Schema({

    day: {
        type: Number,
        required: [true, "Day is required"],
        min: 1,
        max: 30
    },

    focus: {
        type: String,
        required: [true, "Focus is required"]
    },

    tasks: {
        type: [String],
        required: [true, "Preparation tasks are required"],

        validate: {
            validator: function (tasks) {
                return tasks.length > 0;
            },
            message: "Each preparation day must contain at least one task"
        }
    }

}, {
    _id: false
});


// ============================================================
// 5. ADAPTIVE PREPARATION PLAN SCHEMA
// ============================================================

/**
 * Stores the complete AI-generated preparation roadmap.
 *
 * Duration: 5–30 days, determined by the AI.
 *
 * Validations:
 * - totalDays must match the number of roadmap entries.
 * - Day numbers must be sequential, starting from 1.
 */

const preparationPlanSchema = new mongoose.Schema({

    totalDays: {
        type: Number,
        required: [true, "Total preparation days are required"],
        min: 5,
        max: 30
    },

    difficulty: {
        type: String,
        enum: ["beginner", "intermediate", "advanced"],
        required: [true, "Preparation difficulty is required"]
    },

    dailyCommitmentHours: {
        type: Number,
        required: [true, "Daily commitment hours are required"],
        min: 1,
        max: 12
    },

    days: {
        type: [preparationDaySchema],
        required: [true, "Preparation days are required"],

        validate: [
            {
                validator: function (days) {
                    return days.length >= 5 && days.length <= 30;
                },
                message: "Preparation roadmap must contain between 5 and 30 days"
            },

            {
                validator: function (days) {
                    return days.length === this.totalDays;
                },
                message: "Total preparation days must match the number of roadmap entries"
            },

            {
                validator: function (days) {
                    return days.every(
                        (day, index) => day.day === index + 1
                    );
                },
                message: "Preparation day numbers must be sequential, starting from 1"
            }
        ]
    }

}, {
    _id: false
});


// ============================================================
// 6. MAIN INTERVIEW REPORT SCHEMA
// ============================================================

const interviewReportSchema = new mongoose.Schema({

    // User Reference

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "User reference is required"]
    },


    // Candidate Information

    jobDescription: {
        type: String,
        required: [true, "Job description is required"]
    },

    resume: {
        type: String
    },

    selfDescription: {
        type: String
    },


    // Job Match Analysis

    matchScore: {
        type: Number,
        min: 0,
        max: 100
    },


    // Technical Interview Questions

    technicalQuestions: {
        type: [technicalQuestionSchema],

        validate: {
            validator: function (questions) {
                return questions.length === 10;
            },
            message: "Exactly 10 technical questions are required"
        }
    },


    // Behavioral Interview Questions

    behavioralQuestions: {
        type: [behavioralQuestionSchema],

        validate: {
            validator: function (questions) {
                return questions.length === 5;
            },
            message: "Exactly 5 behavioral questions are required"
        }
    },


    // Skill Gap Analysis

    skillGaps: {
        type: [skillGapSchema]
    },


    // Adaptive Preparation Roadmap

    preparationPlan: {
        type: preparationPlanSchema,
        required: [true, "Preparation roadmap is required"]
    }

}, {
    timestamps: true
});


// ============================================================
// 7. CREATE AND EXPORT MODEL
// ============================================================

const interviewReportModel = mongoose.model(
    "InterviewReport",
    interviewReportSchema
);

module.exports = interviewReportModel;
