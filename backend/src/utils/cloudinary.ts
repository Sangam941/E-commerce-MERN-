import { v2 as cloudinary } from 'cloudinary';
import getDataurl, { FileUpload } from './UrlGenerator';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Upload an image to Cloudinary. Accepts a file object from multer (.buffer, .originalname).
export const uploadImageToCloudinary = async (file: FileUpload) => {
  const dataUrl = getDataurl(file);

  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(dataUrl.content, {
      resource_type: 'image',
    }, (error, result) => {
      if (error) {
        return reject(error);
      }
      resolve(result);
    });
  });
};
