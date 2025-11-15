import React, { useState } from "react";

export default function PasteTextModal({ onClose, onSubmit }) {
  const [text, setText] = useState("");

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-xl w-[550px]">
        <h2 className="text-xl font-semibold mb-4">Paste text</h2>

        <textarea
          className="w-full h-[200px] border p-3 rounded-lg"
          placeholder="Paste any text here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <div className="flex justify-end gap-3 mt-4">
          <button className="px-4 py-2 bg-gray-200 rounded-lg" onClick={onClose}>
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-lg"
            onClick={() => {
              onSubmit(text);
              onClose();
            }}
          >
            Add Text
          </button>
        </div>
      </div>
    </div>
  );
}
