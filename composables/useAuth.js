import jwt_decode from "jwt-decode";

export default () => {
  const useAuthToken = () => useState("auth_token");
  const useAuthUser = () => useState("auth_user");
  const useAuthLoading = () => useState("auth_lading", () => true);

  const setToken = (newToken) => {
    const authToken = useAuthToken();
    authToken.value = newToken;
  };

  //for taking it in app.vue (state)

  const setUser = (newUser) => {
    const authUser = useAuthUser();
    authUser.value = newUser;
  };

  const setAuthLoading = (value) => {
    const authLoading = useAuthLoading();
    authLoading.value = value;
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
  // --------------------

  const refreshToken = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await $fetch("/api/auth/refresh");
        // getting token from cookies, decoding it, create new access token
        setToken(data.access_token);
        resolve(true);
      } catch (error) {
        reject(error);
      }
    });
  };
  // save refreshToken in localstorage (we don't need to login every time after refreshing the page)

  const getUser = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await useFetchApi("/api/auth/user");
        // getting token from cookies, decoding it, create new access token

        setUser(data.user);
        resolve(true);
      } catch (error) {
        reject(error);
      }
    });
  };

  const reRefreshAccessToken = () => {
    const authToken = useAuthToken();
    if (!authToken.value) {
      return;
    }

    const jwt = jwt_decode(authToken.value);

    // 1) decoding token wich saved in memory

    const newRefreshTime = jwt.exp - 6000;
    //2)  taking exp (life time)
    setTimeout(async () => {
      await refreshToken(), reRefreshAccessToken();
    }, newRefreshTime);
    //making refreshing in setTimeout
  };

  const initAuth = () => {
    return new Promise(async (resolve, reject) => {
      setAuthLoading(true);
      try {
        await refreshToken();
        await getUser();
        reRefreshAccessToken();
        resolve(true);
      } catch (error) {
        reject(error);
      } finally {
        setAuthLoading(false);
      }
    });
  };

  return { login, useAuthUser, initAuth, useAuthToken, useAuthLoading };
};
