import React from "react";

export default function Sidebar({ selectedDoc }) {
  return (
    <aside className="w-[2000px] bg-white dark:bg-gray-900 dark:text-gray-100 shadow-xl border-r dark:border-gray-700 p-6 flex flex-col">

      <div className="flex items-center gap-3 mb-10">
        <img 
          src="/Logo.jpg"
          alt="IntelliDocs Logo"
          className="w-12 h-12 rounded-lg"
        />
        <span className="text-3xl font-bold tracking-tight">
          IntelliDocs
        </span>
      </div>

      <div className="flex-grow overflow-y-auto">
        <div className="font-semibold text-gray-600 dark:text-gray-400 mb-3">
          Notebook
        </div>

        {selectedDoc ? (
          <div className="p-4 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow mb-4">
            <div className="font-medium text-md text-gray-900 dark:text-gray-100">
              {selectedDoc.title}
            </div>

            <span
              className={`mt-2 inline-block px-2 py-1 text-xs rounded 
                ${selectedDoc.status === "done"
                  ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200"
                  : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-200"
                }`}
            >
              {selectedDoc.status}
            </span>
          </div>
        ) : (
          <div className="text-gray-500 dark:text-gray-400">
            No document selected
          </div>
        )}
      </div>

    </aside>
  );
}
