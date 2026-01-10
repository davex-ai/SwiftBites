export const getImageUrl = (path) => {
  if (!path) return '/placeholder.png'; 
    if (path.startsWith('/')) {
    return `https://swiftbites-backend-cwmy.onrender.com${path}`;
  }

    return path;
};