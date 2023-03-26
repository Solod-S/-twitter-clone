export const userTransformer = (user) => {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    username: user.username,
    profileImage: user.profileImage,
  };
};
//if we don't want to see any sensitive data to client
