import formidable from "formidable";
// for grabing data from body
import { createTweet } from "~~/server/db/tweets";
import { tweetTransformer } from "~~/server/transformers/tweet";
import { createMediaFile } from "~~/server/db/createMediaFile";
import { uploadToCloudinary } from "~~/server/utils/cloudinary";

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

  const replyTo = fields.replyTo;

  if (replyTo && replyTo !== "null") {
    tweetData.replyToId = replyTo;
  }

  const tweet = await createTweet(tweetData);

  const filePromises = Object.keys(files).map(async (key) => {
    const file = files[key];

    const cloudinaryResource = await uploadToCloudinary(file.filepath);

    return createMediaFile({
      url: cloudinaryResource.secure_url,
      providerPublicId: cloudinaryResource.public_id,
      userId: userId,
      tweetId: tweet.id,
    });
  });

  await Promise.all(filePromises);

  return {
    tweet: tweetTransformer(tweet),
  };
});
