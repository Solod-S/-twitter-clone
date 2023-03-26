export default async (url, options = {}) => {
  const { useAuthToken } = useAuth();
  console.log(useAuthToken().value);
  return await $fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${useAuthToken().value}`,
    },
  });
};
