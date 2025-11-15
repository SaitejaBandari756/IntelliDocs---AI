import React, { useRef, useState } from "react";

import UrlModal from "./UrlModal";
import PasteTextModal from "./PasteTextModal";

export default function UploadModal({ open , onClose, onUploadFile, onPasteText }) {
  const fileInput = useRef();
  const [showUrlModal, setShowUrlModal] = useState(false);
  const [showPasteModal, setShowPasteModal] = useState(false);

  if (!open) return null;

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) onUploadFile(file);
  };

  const triggerFilePicker = () => fileInput.current.click();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 w-[750px] p-8 rounded-2xl shadow-2xl relative max-h-[90vh] overflow-y-auto border border-gray-100 dark:border-gray-700" onClick={(e) => e.stopPropagation()}>

        <button
          className="absolute top-5 right-5 text-gray-400 dark:text-gray-200 text-2xl hover:text-gray-700 dark:hover:text-white"
          onClick={onClose}
          aria-label="Close upload modal"
        >
          ×
        </button>

        <div className="flex items-center gap-3 mb-3">
          <img 
            src="/Logo.jpg" 
            alt="IntelliDocs Logo" 
            className="w-10 h-10"
          />
          <h2 className="text-2xl dark:text-gray-300 font-semibold">Add sources</h2>

        </div>

        <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
          Sources let your Notebook base its responses on the information that matters most to you.
          <br />
          <span className="text-gray-500 text-sm">
            (Examples: marketing plans, course readings, transcripts, sales materials, etc.)
          </span>
        </p>

        <div
          className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl py-16 text-center hover:border-gray-400 dark:hover:border-gray-400 transition cursor-pointer bg-white dark:bg-gray-900"
          onClick={triggerFilePicker}
        >
          <div className="mx-auto mb-4 w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center">
            <svg width="28" height="28" fill="#4F46E5" viewBox="0 0 24 24">
              <path d="M12 2L12 14M12 2L6 8M12 2L18 8" stroke="#4F46E5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <rect x="4" y="14" width="16" height="8" rx="2" stroke="#4F46E5" strokeWidth="2" />
            </svg>
          </div>

          <p className="text-gray-900 dark:text-gray-100 font-semibold text-lg">Upload sources</p>

          <p className="text-gray-500 dark:text-gray-400 mt-2">
            Drag and drop or{" "}
            <span
              className="text-blue-600 cursor-pointer"
              onClick={triggerFilePicker}
            >
              choose file
            </span>
            {" "}to upload
          </p>

          <input
            type="file"
            ref={fileInput}
            onChange={handleFileSelect}
            className="hidden"
          />

          <p className="text-xs text-gray-400 dark:text-gray-400 mt-4">
            Supported file types: PDF, TXT, Markdown, Audio (mp3), Images (PNG, JPG, BMP, GIF),
            HEIC, WEBP, ICO, etc.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-5 mt-10">

          <div className="border p-5 rounded-xl shadow-sm hover:shadow-md cursor-pointer transition bg-white dark:bg-gray-800">
            <p className="font-medium dark:text-gray-300 mb-3">Google Workspace</p>
            <div className="flex items-center gap-2 text-blue-600 font-medium">
              <span>📁</span> Google Drive
            </div>
          </div>

          <div
            className="border p-5 rounded-xl shadow-sm hover:shadow-md cursor-pointer transition bg-white dark:bg-gray-800"
            onClick={() => setShowUrlModal(true)}
          >
            <p className="font-medium dark:text-gray-300 mb-3">Link</p>
            <div className="flex flex-col gap-2 text-blue-600 font-medium">
              <span>🔗 Website</span>
              <span>▶️ YouTube</span>
            </div>
          </div>

          <div
            className="border p-5 rounded-xl shadow-sm hover:shadow-md cursor-pointer transition bg-white dark:bg-gray-800"
            onClick={() => setShowPasteModal(true)}
          >
            <p className="font-medium dark:text-gray-300 mb-3">Paste text</p>
            <div className="flex items-center gap-2 text-blue-600 font-medium">
              <span>📋</span> Copied text
            </div>
          </div>

          {showUrlModal && (
            <UrlModal
              onClose={() => setShowUrlModal(false)}
              onSubmit={(url) => console.log("URL added:", url)}
            />
          )}

          {showPasteModal && (
            <PasteTextModal
              onClose={() => setShowPasteModal(false)}
              onSubmit={(text) => console.log("Text added:", text)}
            />
          )}

        </div>
      </div>
    </div>
  );
}
