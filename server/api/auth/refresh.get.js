import { useCookie } from "nuxt/app";

export default defineEventHandler(async (event) => {
  const cookies = useCookie(event);
  console.log(`cookies`, cookies);
  // console.log(`event`, await event.refresh_token);
  // const refreshToken = cookies.refresh_token;
  const refreshToken = "sss";

  return {
    hello: refreshToken,
  };
});
