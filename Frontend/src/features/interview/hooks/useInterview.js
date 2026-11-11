
import { useCallback, useContext } from "react";
import { InterviewContext } from "../interview.context";

import {
    getAllInterviewReports,
    generateInterviewReport,
    getInterviewReportById
} from "../services/interview.api";

/**
 * @description Custom hook to access interview report state and perform interview-related operations.
 */
export const useInterview = () => {
    const context = useContext(InterviewContext);

    if (!context) {
        throw new Error("useInterview must be used within an InterviewProvider");
    }

    const {
        loading,
        setLoading,
        report,
        setReport,
        reports,
        setReports
    } = context;

    /**
     * @description Generates a new interview report using the user's resume, self-description and job description.
     */
    const generateReport = async ({
        jobDescription,
        selfDescription,
        resumeFile
    }) => {
        setLoading(true);

        try {
            const response = await generateInterviewReport({
                jobDescription,
                selfDescription,
                resumeFile
            });

            setReport(response.interviewReport);

            return response;
        } finally {
            setLoading(false);
        }
    };

    /**
     * @description Fetches a specific interview report using its ID.
     */
    const fetchReportById = useCallback(async (interviewId) => {
        setLoading(true);

        try {
            const response = await getInterviewReportById(interviewId);

            setReport(response.interviewReport);

            return response;
        } finally {
            setLoading(false);
        }
    }, [setLoading, setReport]);

    /**
     * @description Fetches all interview reports belonging to the logged-in user.
     */
    const fetchAllReports = async () => {
        setLoading(true);

        try {
            const response = await getAllInterviewReports();

            setReports(response.interviewReports);

            return response;
        } finally {
            setLoading(false);
        }
    };

    return {
        loading,
        report,
        reports,
        generateReport,
        fetchReportById,
        fetchAllReports
    };
};
