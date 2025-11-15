import React, { useEffect, useState } from "react";
import { getDocuments } from "../services/api";

const statusColors = {
  processing: "text-yellow-600 bg-yellow-100",
  done: "text-green-600 bg-green-100",
  failed: "text-red-600 bg-red-100",
};

export default function DocumentList({ onSelect, selectedId }) {
  const [docs, setDocs] = useState([]);

  useEffect(() => {
    getDocuments().then(setDocs);
  }, []);

  return (
    <div className="space-y-3">
      {docs.map((d) => (
        <div
          key={d.id}
          onClick={() => onSelect(d.id)}
          className={`p-3 rounded-lg border cursor-pointer bg-white dark:bg-gray-800 dark:text-gray-100 ${
            selectedId === d.id ? "bg-blue-50 dark:bg-blue-700 border-blue-500 dark:text-white" : "bg-white"
          } hover:border-gray-300 dark:hover:border-gray-600 hover:shadow-md transition transform hover:-translate-y-0.5 hover:scale-[1.01]`}
        >
          <div className="font-medium text-gray-900 dark:text-gray-100">{d.title}</div>
          <span
            className={`inline-block mt-1 px-2 py-1 text-xs rounded ${statusColors[d.status]} dark:bg-opacity-30`}
          >
            {d.status}
          </span>
        </div>
      ))}
    </div>
  );
}
