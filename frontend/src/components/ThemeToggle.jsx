import React, { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const [theme, setTheme] = useState(() => {
    try {
      const saved = localStorage.getItem('theme');
      if (saved) return saved;
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    } catch (e) {
      return 'light';
    }
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    try { localStorage.setItem('theme', theme); } catch (e) {}
  }, [theme]);

  return (
    <button
      aria-label="Toggle theme"
      onClick={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))}
      className="px-3 py-2 rounded-full bg-gray-100 dark:bg-gray-800 text-sm flex items-center gap-2 border border-gray-200 dark:border-gray-700 shadow-sm hover:brightness-95 transition"
    >
      <span className="text-sm">{theme === 'dark' ? '🌙' : '☀️'}</span>
      <span className="text-sm text-gray-700 dark:text-gray-200">{theme === 'dark' ? 'Dark' : 'Light'}</span>
    </button>
  );
}
