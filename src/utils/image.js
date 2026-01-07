// src/utils/image.js
export const getImageUrl = (path) => {
  if (!path) return '/placeholder.png'; // fallback

  // If path starts with /, prepend backend URL
  if (path.startsWith('/')) {
    return `https://swiftbites-backend-cwmy.onrender.com${path}`;
  }

  // Otherwise, return as-is (for absolute URLs)
  return path;
};