import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import NotebookContent from "../components/NotebookContent";
import ChatPanel from "../components/ChatPanel";
import { getDocuments } from "../services/api";

export default function Notebook() {
  const { id } = useParams();
  const [doc, setDoc] = useState(null);

  useEffect(() => {
    getDocuments(id)
    .then(data => {
      console.log("Notebook loaded:", data);
      setDoc(data);
    })
    .catch(err => {
      console.error("Error loading notebook:", err);
    });
    
  }, [id]);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar selectedDoc={doc} />

      <main className="flex-grow p-10 overflow-y-auto bg-gray-50 dark:bg-gray-900">
        {doc ? (
          <NotebookContent doc={doc} />
        ) : (
          <div className="text-gray-500 text-lg">Loading Notebook...</div>
        )}
      </main>
      <div className="w-[420px] bg-gray-50 dark:bg-gray-900 border-l dark:border-gray-700 p-6">
        <ChatPanel docId={doc?.id} />
      </div>
    </div>
  );
}
