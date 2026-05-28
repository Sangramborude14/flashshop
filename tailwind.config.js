// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        // Slate neutral palette
        neutral: {
          950: '#020617', // Main background
          900: '#0f172a', // Cards/Panels
          800: '#1e293b', // Borders/Dividers
        },
        // Primary accent (e.g., a crisp blue or purple)
        primary: {
          500: '#3b82f6',
          600: '#2563eb',
        }
      }
    }
  }
}