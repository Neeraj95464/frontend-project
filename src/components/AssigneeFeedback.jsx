import { getAssigneeFeedback } from "../api";
import { useEffect, useState } from "react";

const AssigneeFeedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [page, setPage] = useState(0);
  const [size] = useState(30);
  const [paginationInfo, setPaginationInfo] = useState({
    totalPages: 0,
    totalElements: 0,
    last: false,
  });

  useEffect(() => {
    fetchFeedbacks();
  }, [page]);

  const fetchFeedbacks = async () => {
    try {
      const res = await getAssigneeFeedback(page, size); // no department param
      const { content, totalPages, totalElements, last } = res;
      setFeedbacks(content);
      setPaginationInfo({ totalPages, totalElements, last });
    } catch (err) {
      console.error("Error fetching feedbacks:", err);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4 text-center">
        Assignee Feedback Summary
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full table-auto border border-gray-300 text-sm">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-2 border">Assignee</th>
              <th className="p-2 border">Avg. Rating</th>
              <th className="p-2 border">Total Feedbacks</th>
            </tr>
          </thead>
          <tbody>
            {feedbacks.length > 0 ? (
              feedbacks.map((f, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="p-2 border">{f.assigneeName}</td>
                  <td className="p-2 border text-center">
                    {f.averageRating?.toFixed(2)}
                  </td>
                  <td className="p-2 border text-center">{f.totalFeedbacks}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="p-4 text-center text-gray-500">
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="mt-4 flex items-center gap-2 justify-center">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
          disabled={page === 0}
          className="px-3 py-1 border rounded bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
        >
          &lt;
        </button>
        <span className="text-sm text-gray-700">
          <strong>{page + 1}</strong> of{" "}
          <strong>{paginationInfo.totalPages}</strong> Total:{" "}
          <strong>{paginationInfo.totalElements}</strong>
        </span>
        <button
          onClick={() => {
            if (!paginationInfo.last) setPage((prev) => prev + 1);
          }}
          disabled={paginationInfo.last}
          className="px-3 py-1 border rounded bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default AssigneeFeedback;
