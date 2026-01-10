export const getAvatarUrl = (user) => {
  if (user.photo) return user.photo;
  if (user.googleId) {
    return `https://lh3.googleusercontent.com/a/${user.googleId}`;
  }
  
  const name = user.name || "User";
  const firstInitial = name.charAt(0).toUpperCase();
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(firstInitial)}&background=random&color=fff`;
};