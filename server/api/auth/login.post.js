import { getUserByUsername } from "~~/server/db/users";
import { generateToken, sendRefreshToken } from "~~/server/utils/jwt";
import bcrypt from "bcrypt";
import { userTransformer } from "~~/server/transformers/user";
import { createRefreshToken } from "~~/server/db/refreshToken";
import { sendError } from "h3";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const { username, password } = body;
  if (!username || !password) {
    return sendError(
      event,
      createError({
        statusCode: 400,
        status: "Invalid params",
        statusMessage: "Invalid params",
      })
    );
  }

  const user = await getUserByUsername(username);
  if (!user) {
    return sendError(
      event,
      createError({
        statusCode: 400,
        status: "Username or password invalid",
        statusMessage: "Username or password invalid",
      })
    );
  }
  // Is the user register

  const doesThePasswordMatch = await bcrypt.compare(password, user.password);

  if (!doesThePasswordMatch) {
    return sendError(
      event,
      createError({
        statusCode: 400,
        status: "Username or password invalid",
        statusMessage: "Username or password invalid",
      })
    );
  }
  // Compare password
  const { accessToken, refreshToken } = generateToken(user);
  // Generate Tokens (acces token & refresh token)

  await createRefreshToken({ token: refreshToken, userId: user.id });
  //Save it inside db

  sendRefreshToken(event, refreshToken);
  //Add http only cookie

  return {
    access_token: accessToken,
    user: userTransformer(user),
  };
});
