
import { useCallback, useContext } from "react";
import { InterviewContext } from "../interview.context";
import {
    getAllInterviewReports,
    generateInterviewReport,
    getInterviewReportById
} from "../services/interview.api";

/**
 * @description Provides interview report operations and shared state.
 */
export const useInterview = () => {
    const context = useContext(InterviewContext);

    if (!context) {
        throw new Error(
            "useInterview must be used within an InterviewProvider"
        );
    }

    const {
        loading,
        setLoading,
        reportsLoading,
        setReportsLoading,
        report,
        setReport,
        reports,
        setReports
    } = context;

    /**
     * @description Generates a new interview report.
     */
    const generateReport = useCallback(async ({
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
    }, [setLoading, setReport]);

    /**
     * @description Fetches an individual interview report by its ID.
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
     * @description Fetches all interview reports belonging to the user.
     */
    const fetchAllReports = useCallback(async () => {
        setReportsLoading(true);

        try {
            const response = await getAllInterviewReports();

            setReports(response.interviewReports || []);

            return response;
        } finally {
            setReportsLoading(false);
        }
    }, [setReportsLoading, setReports]);

    return {
        loading,
        reportsLoading,
        report,
        reports,
        generateReport,
        fetchReportById,
        fetchAllReports
    };
};
