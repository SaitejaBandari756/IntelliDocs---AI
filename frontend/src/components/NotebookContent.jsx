import React, { useState } from "react";
// import ChatPanel from "../components/ChatPanel";

export default function NotebookContent({ doc }) {
  const [tab, setTab] = useState("summary");

  const tabs = [
    { id: "summary", label: "Summary" },
    { id: "text", label: "Extracted Text" },
  ];

  if (!doc) return <div className="text-gray-500">No document selected.</div>;

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">{doc.title}</h2>

      <div className="flex border-b mb-8 space-x-8">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`pb-3 text-lg ${
              tab === t.id
                ? "border-b-4 border-blue-500 text-blue-400"
                : "text-gray-400 dark:text-gray-400 hover:text-gray-200"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === "summary" && (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
          <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">AI Summary</h3>
          <p className="whitespace-pre-wrap text-gray-700 dark:text-gray-200">{doc.summary || "No summary available."}</p>
        </div>
      )}

      {tab === "text" && (
        <div className="space-y-6">
          {Object.keys(doc.extracted_text || {}).map((page) => (
            <div key={page} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
              <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-gray-100">{page.replace("_", " ")}</h3>
              <p className="whitespace-pre-wrap text-gray-700 dark:text-gray-200">
                {doc.extracted_text[page].text}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
