import { sendError } from "h3";
export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { username, password, repeatPassword, email, name } = body;

  if (!username || !password || !repeatPassword || !email || !name) {
    return sendError(
      event,
      createError({ statusCode: 400, statusMessage: "Invalid params" })
    );
  }
  return {
    body: body,
  };
});

// POST request with user regustration data
//npx prisma
// npx prisma init
