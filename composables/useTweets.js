export default () => {
  const postTweet = (formData) => {
    const form = new FormData();
    form.append("text", formData.text);
    // preparing text
    formData.mediaFiles.forEach((mediaFile, index) => {
      form.append("media_file_" + index, mediaFile);
    });
    // preparing media file
    return useFetchApi("api/user/tweets", { method: "POST", body: form });
  };
  return {
    postTweet,
  };
};
