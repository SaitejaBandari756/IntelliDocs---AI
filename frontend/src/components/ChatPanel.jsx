import React, { useEffect, useRef, useState } from "react";
import { sendChatMessage } from "../services/api";

export default function ChatPanel({ docId }) {
  const [messages, setMessages] = useState([]); 
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef();

  useEffect(() => {
    setMessages([]);
    setInput("");
  }, [docId]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = async () => {
    const text = input.trim();
    if (!text) return;
    const userMsg = { role: "user", text };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const data = await sendChatMessage(docId, text);
      setMessages((m) => [...m, { role: "assistant", text: data.reply }]);
    } catch (e) {
      setMessages((m) => [...m, { role: "assistant", text: "Error: " + e.message }]);
    } finally {
      setLoading(false);
    }
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter" && (e.ctrlKey || e.shiftKey === false)) {
      e.preventDefault();
      send();
    }
  };

  return (
    <div className="w-96 border-l bg-white dark:bg-gray-900 dark:border-gray-700 text-gray-900 dark:text-gray-100 flex flex-col">
      <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-900">
        <div className="font-semibold text-gray-900 dark:text-gray-100">Chat with document</div>
        <div className="text-sm text-gray-600 dark:text-gray-400">Ask questions about the uploaded content</div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((m, idx) => (
          <div key={idx} className={`max-w-[85%] ${m.role === "user" ? "ml-auto" : ""}`}>
            <div className={`inline-block p-3 rounded-lg shadow-sm ${m.role === "user" ? "bg-blue-600 text-white" : "bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100"}`}>
              <div style={{ whiteSpace: "pre-wrap" }}>{m.text}</div>
            </div>
          </div>
        ))}

        <div ref={endRef} />
      </div>

      <div className="p-3 border-t">
        <textarea
          className="w-full border rounded-md p-2 h-20 resize-none bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder={loading ? "Waiting for response..." : "Type a question or paste text... (Enter to send)"}
          disabled={loading}
        />
        <div className="flex justify-end mt-2">
          <button
            onClick={send}
            disabled={loading || !input.trim()}
            className="px-4 py-2 bg-blue-600 text-white rounded-md disabled:opacity-60"
          >
            {loading ? "Thinking..." : "Send"}
          </button>
        </div>
      </div>
    </div>
  );
}
