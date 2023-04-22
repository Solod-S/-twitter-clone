import { v2 as _cloudinary } from "cloudinary";

const cloudinary = () => {
  const config = useRuntimeConfig();
  // acces to nuxtconfig .env
  console.log(config);
  _cloudinary.config({
    cloud_name: config.cloudinaryCloudName,
    api_key: config.cloudinaryApiKey,
    api_secret: config.cloudinaryApiSecret,
  });

  return _cloudinary;
};

export const uploadToCloudinary = (image) => {
  return new Promise((resolve, reject) => {
    cloudinary().uploader.upload(image, (err, data) => {
      // const config = useRuntimeConfig();
      // // acces to nuxtconfig .env

      // cloudinary.config({
      //   cloud_name: config.cloudinaryCloudName,
      //   api_key: config.cloudinaryApiKey,
      //   api_secret: config.cloudinaryApiSecret,
      // });
      // // !!!basic usage with cloudinary.uploader.upload(image, (err, data)...

      if (err) {
        reject(err);
      }
      resolve(data);
    });
  });
};
