import { sendError } from "h3";
import { createUser } from "../../db/users";
import { userTransformer } from "~~/server/transformers/user";
// dont expose the password in return

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { username, password, repeatPassword, email, name } = body;

  if (!username || !password || !repeatPassword || !email || !name) {
    return sendError(
      event,
      createError({ statusCode: 400, statusMessage: "Invalid params" })
    );
  }
  if (password !== repeatPassword) {
    return sendError(
      event,
      createError({ statusCode: 400, statusMessage: "Password do not match" })
    );
  }

  const userData = {
    username,
    email,
    password,
    name,
  };

  const user = await createUser(userData);

  return {
    body: userTransformer(user),
  };
});

// POST request with user registration data
//http://localhost:3000/api/auth/register
