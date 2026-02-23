import cloudinary from 'cloudinary';
import fs from 'fs-extra';
import config from '../../config.js';

cloudinary.config({
    cloud_name: config.CLOUD_NAME,
    api_key: config.API_KEY,
    api_secret: config.API_SECRET
});

export const uploadImage = async (image) => {
    try {
        var imageUpload = await cloudinary.v2.uploader.upload(image);
        await fs.unlink(image);
        return {
            ok: true,
            imageUpload
        };
    } catch (e) {
        console.log('Error Trying to upload img');
        return {
            ok: false,
            message: 'Error trying to upoad image'
        };
    }
}