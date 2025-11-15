import React, { useEffect, useState } from "react";
import UploadForm from "../components/UploadForm";
import { getDocuments, uploadDocument, uploadText } from "../services/api";
import { useNavigate } from "react-router-dom";
import ThemeToggle from "../components/ThemeToggle";


export default function Home() {
    // const [open, setOpen] = useState(false);
    const [showUpload, setShowUpload] = useState(false);
    

    const [notebooks, setNotebooks] = useState([]);
    const navigate = useNavigate();

  useEffect(() => {
    loadNotebooks();
  }, []);

  const loadNotebooks = async () => {
    const data = await getDocuments();
    setNotebooks(data);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-10">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-bold flex items-center gap-3 text-gray-800 dark:text-gray-100">
          <img 
            src="/Logo.jpg" 
            alt="IntelliDocs Logo" 
            className="w-10 h-10"
          />
          IntelliDocs
        </h1>
        <div className="flex items-center gap-4">
          <ThemeToggle />
 
        <button
          onClick={() => setShowUpload(true)}
          className="bg-black text-white px-5 py-3 rounded-xl"
        >
          + Create New
        </button>
        </div>
      </div>

      <UploadForm
        open={showUpload}
        onClose={() => setShowUpload(false)}
        onUploadFile={async (file) => {
          try {
            const resp = await uploadDocument(file);
            setShowUpload(false);
            if (resp?.id) navigate(`/notebook/${resp.id}`);
          } catch (e) {
            console.error('Upload failed', e);
            alert('Upload failed: ' + e.message);
          }
        }}
        onPasteText={async () => {
          const text = window.prompt('Paste text to upload');
          if (!text) return;
          try {
            const resp = await uploadText(text);
            setShowUpload(false);
            if (resp?.id) navigate(`/notebook/${resp.id}`);
          } catch (e) {
            console.error('Upload text failed', e);
            alert('Upload failed: ' + e.message);
          }
        }}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
        
        {notebooks.map((nb) => (
          <div
            key={nb.id}
            onClick={() => navigate(`/notebook/${nb.id}`)}
            className="cursor-pointer bg-white dark:bg-gray-800 rounded-xl shadow-md p-5 border border-gray-200 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-500 h-[180px] flex flex-col justify-between card-gradient-hover transition-all duration-300"
          >
            <div>
              <h2 className="font-semibold text-lg line-clamp-2 text-gray-900 dark:text-gray-100">
                {nb.title || "Untitled Document"}
              </h2>
              <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">
                {new Date(nb.uploaded_at).toLocaleDateString()}
              </p>
            </div>
            <div>
              <span
                className={`text-xs px-3 py-1 rounded-md font-medium ${
                  nb.status === "done"
                    ? "bg-green-50 text-green-700 dark:bg-green-900 dark:text-green-200"
                    : nb.status === "processing"
                    ? "bg-yellow-50 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-200"
                    : "bg-red-50 text-red-700 dark:bg-red-900 dark:text-red-200"
                }`}
              >
                {nb.status}
              </span>
            </div>
          </div>
        ))}

      </div>
    </div>
  );
}
