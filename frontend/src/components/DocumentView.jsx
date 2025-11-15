import React, { useEffect, useState } from "react";
import { getDocuments } from "../services/api";

export default function DocumentView({ id }) {
  const [doc, setDoc] = useState(null);
  const [tab, setTab] = useState("summary");

  useEffect(() => {
    if (!id) return;
    getDocuments(id).then(setDoc);
    setTab("summary");
  }, [id]);

  if (!doc) return <div>Loading...</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">{doc.title}</h1>

   
      <div className="flex gap-4 border-b mb-4 pb-2">
        {["summary", "text", "raw"].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`pb-2 ${
              tab === t ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-500"
            }`}
          >
            {t === "summary" ? "Summary" : t === "text" ? "Extracted Text" : "Raw JSON"}
          </button>
        ))}
      </div>


      <div>
        {tab === "summary" && (
          <div className="bg-white dark:bg-gray-800 p-5 rounded shadow">
            <h2 className="text-xl font-semibold mb-2">Summary</h2>
            <p className="whitespace-pre-wrap text-gray-700">{doc.summary}</p>
          </div>
        )}

        {tab === "text" && (
          <div className="space-y-6">
            {Object.keys(doc.extracted_text || {}).map((page) => (
              <div key={page} className="bg-white dark:bg-gray-800 p-4 rounded shadow">
                <h3 className="text-lg font-semibold mb-2">{page}</h3>
                <p className="whitespace-pre-wrap text-gray-700">
                  {doc.extracted_text[page].text}
                </p>
              </div>
            ))}
          </div>
        )}

        {tab === "raw" && (
          <pre className="bg-gray-800 text-white p-4 rounded overflow-x-auto">
            {JSON.stringify(doc, null, 2)}
          </pre>
        )}
      </div>
    </div>
  );
}
