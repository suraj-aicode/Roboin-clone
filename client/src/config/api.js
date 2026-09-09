// Central API base URL configuration
// In production (Netlify), set VITE_API_URL to your Render backend URL (e.g. https://your-backend.onrender.com)
// In local development, falls back to http://localhost:5000
export const API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:5000').replace(/\/+$/, '');

export default API_URL;
