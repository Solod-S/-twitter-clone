import { sendError } from "h3";
import { getRefreshTokenByToken } from "~~/server/db/refreshToken";
import { decodeRefreshToken, generateToken } from "~~/server/utils/jwt";
import { getUserById } from "~~/server/db/users";
export default defineEventHandler(async (event) => {
  const refreshToken = getCookie(event, "refresh_token");

  if (!refreshToken) {
    return sendError(
      event,
      createError({
        statusCode: 401,
        statusMessage: "Refresh token is invalid",
      })
    );
  }

  //check refresh token in cookies
  const rToken = await getRefreshTokenByToken(refreshToken);

  if (!rToken) {
    return sendError(
      event,
      createError({
        statusCode: 401,
        statusMessage: "Refresh token is invalid",
      })
    );
  }

  //check refresh token in db

  const token = decodeRefreshToken(refreshToken);
  //decode and checking refresh token
  try {
    const user = await getUserById(token.userId);
    // get user information by id
    const { accessToken } = generateToken(user);
    // generating token by user id
    return { access_token: accessToken };
  } catch (error) {
    return sendError(
      event,
      createError({
        statusCode: 500,
        statusMessage: "Something went wrong",
      })
    );
  }
});
