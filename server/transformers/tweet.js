import { mediaFilesTransformer } from "./mediaFiles";
import { userTransformer } from "./user";
import human from "human-time";

export const tweetTransformer = (tweet) => {
  const result = {
    id: tweet.id,
    text: tweet.text,
    author: !!tweet.author ? userTransformer(tweet.author) : null,
    mediaFiles: !!tweet.mediaFiles
      ? tweet.mediaFiles.map(mediaFilesTransformer)
      : [],
    // replies: !!tweet.replies ? tweet.replies.map(tweetTransformer) : [],
    // replyTo: !!tweet.replyTo ? tweetTransformer(tweet.replyTo) : null,
    replies: !!tweet.replies ? tweet.replies.map(tweetTransformer) : [],
    replyTo: !!tweet.replyTo ? tweetTransformer(tweet.replyTo) : null,
    repliesCount: !!tweet.replies ? tweet.replies.length : 0,
    postedAtHuman: human(tweet.createdAt),
  };

  return result;
};
