// Central API base URL configuration
const isLocal = typeof window !== 'undefined' && (
  window.location.hostname === 'localhost' || 
  window.location.hostname === '127.0.0.1'
);

// In local development, falls back to http://localhost:5000
// In production (Netlify), automatically connects to live Render backend: https://roboin-clone.onrender.com
export const API_URL = (
  import.meta.env.VITE_API_URL || 
  (isLocal ? 'http://localhost:5000' : 'https://roboin-clone.onrender.com')
).replace(/\/+$/, '');

export default API_URL;

