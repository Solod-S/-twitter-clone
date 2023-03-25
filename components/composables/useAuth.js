export default () => {
  const useAuthToken = () => useState("auth_token");
  const useAuthUser = () => useState("auth_user");

  const setToken = (newToken) => {
    const authToken = useAuthToken();
    authToken.value = newToken;
  };

  //for taking it in app.vue (state)

  const setUser = (newUser) => {
    const authUser = useAuthUser();
    authUser.value = newUser;
  };

  const login = ({ username, password }) => {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await $fetch("/api/auth/login", {
          method: "POST",
          body: {
            username,
            password,
          },
        });

        setToken(data.access_token);
        setUser(data.user);
        resolve(true);
      } catch (error) {
        console.log(`login.error`, error);
        reject(error);
      }
    });
  };
  return { login, useAuthUser };
};

// --------------------

const refreshToken = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await $fetch("/api/auth/refresh");
      setToken(data.access_token);
    } catch (error) {
      reject(error);
    }
  });
};

const initAuth = () => {
  return new Promise(async (resolve, reject) => {
    try {
      await refreshToken();
    } catch (error) {
      reject(error);
    }
  });
};
// save refreshToken in localstorage (we don't need to login every time after refreshing the page)
