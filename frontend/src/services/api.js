const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:8000/api";

export async function sendChatMessage(docId, message) {
  const res = await fetch(`${API_BASE}/documents/${docId}/chat/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message }),
  });
  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`Chat error: ${res.status} - ${txt}`);
  }
  return res.json();
}


export async function uploadText(text) {
  const response = await fetch(`${API_BASE}/text/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });

  return await response.json();
}

export async function uploadDocument(file, title) {
  const form = new FormData();
  form.append("file", file);
  form.append("title", title || file.name);

  try {
    const res = await fetch(`${API_BASE}/documents/`, {
      method: "POST",
      body: form,
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`HTTP ${res.status} - ${text}`);
    }
    return await res.json();
  } catch (err) {
    console.error("Upload failed:", err);
    throw err; 
  }
}



export async function getDocuments(id) {
  const url = id ? `${API_BASE}/documents/${id}/` : `${API_BASE}/documents/`;
  const res = await fetch(url);
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Failed to load document(s): ${res.status} ${text}`);
  }
  return await res.json();
}
