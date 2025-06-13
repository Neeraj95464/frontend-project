// src/pages/AssigneeFeedbackOverview.jsx

import { getAllAssigneeFeedbacks } from "../services/api";
import { useEffect, useState } from "react";

export default function AssigneeFeedbackOverview() {
  const [feedbackData, setFeedbackData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFeedbacks() {
      try {
        const res = await getAllAssigneeFeedbacks();
        setFeedbackData(res.data);
      } catch (err) {
        console.error("Failed to fetch feedbacks", err);
      } finally {
        setLoading(false);
      }
    }
    loadFeedbacks();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-blue-700 mb-6">
          Assignee Feedback Summary
        </h1>

        {loading ? (
          <div className="text-gray-600">Loading feedbacks...</div>
        ) : feedbackData.length === 0 ? (
          <div className="text-gray-500">No feedbacks available yet.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {feedbackData.map((entry) => (
              <div
                key={entry.assigneeId}
                className="bg-white shadow-md rounded-xl p-5 hover:shadow-lg transition"
              >
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  {entry.assigneeName}
                </h2>

                <div className="text-yellow-500 text-lg flex items-center mb-1">
                  {Array.from({ length: 5 }, (_, i) => (
                    <span key={i}>
                      {i < Math.round(entry.averageRating) ? "★" : "☆"}
                    </span>
                  ))}
                  <span className="ml-2 text-sm text-gray-600">
                    ({entry.averageRating.toFixed(1)})
                  </span>
                </div>

                <p className="text-sm text-gray-500">
                  Total Feedbacks:{" "}
                  <span className="font-medium">{entry.totalFeedbacks}</span>
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
