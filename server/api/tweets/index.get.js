import { getTweets } from "~~/server/db/tweets";
import { tweetTransformer } from "~~/server/transformers/tweet";

export default defineEventHandler(async (event) => {
  const tweets = await getTweets({
    include: {
      author: true,
      mediaFiles: true,
      // replies: true,
      replies: { include: { author: true } },
      // replies parameter that shows a subcollection of replies to this tweet
      replyTo: { include: { author: true } },
      // replyTo parameter that shows to witch tweet replies  this tweet
    },
    // params to return + author + mediaFiles
    //+ replies with params to grab author data
    //+ replyTo with params to grab author data
    orderBy: [
      {
        createdAt: "desc",
      },
    ],
    // ordering tweets
  });

  return { tweets: tweets.map(tweetTransformer) };
});
