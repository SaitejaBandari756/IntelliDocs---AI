import React, { useState } from "react";

export default function UrlModal({ onClose, onSubmit }) {
  const [url, setUrl] = useState("");

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-xl w-[450px]">
        <h2 className="text-xl font-semibold mb-4">Enter Website or YouTube URL</h2>

        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://example.com"
          className="w-full border p-3 rounded-lg mb-5"
        />

        <div className="flex justify-end gap-3">
          <button className="px-4 py-2 bg-gray-200 rounded-lg" onClick={onClose}>
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-lg"
            onClick={() => {
              onSubmit(url);
              onClose();
            }}
          >
            Add URL
          </button>
        </div>
      </div>
    </div>
  );
}
