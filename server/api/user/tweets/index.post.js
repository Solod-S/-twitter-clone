import formidable from "formidable";
// for grabing data from body
import { createTweet } from "~~/server/db/tweets";
import { tweetTransformer } from "~~/server/transformers/tweet";
import { createMediaFile } from "~~/server/db/createMediaFile";

export default defineEventHandler(async (event) => {
  const form = formidable({});

  const response = await new Promise((resolve, reject) => {
    form.parse(event.req, (err, fields, files) => {
      if (err) {
        reject(err);
      }
      resolve({ fields, files });
    });
  });
  // if something wrong return error, else return body data

  const { fields, files } = response;

  const userId = event.context?.auth?.user?.id;
  const tweetData = {
    authorId: userId,
    text: fields.text,
  };
  const tweet = await createTweet(tweetData);

  const filePromises = Object.keys(files).map(async (key) => {
    return createMediaFile({
      url: "",
      providerPublicId: "random_id",
      userId: userId,
      tweetId: tweet.id,
    });
  });

  await Promise.all(filePromises);

  return {
    // tweet: tweetTransformer(tweet),
    files,
  };
});
