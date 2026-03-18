const cloudinary = require('cloudinary').v2;


exports.uploadToCloudinary = async (file, folder, height, quality) => {

    const options = { folder }

    if (height) {
        options.height = height
    }
    if (quality) {
        options.quality = quality
    }
    options.resource_type = "auto";
    return await cloudinary.uploader.upload(file.tempFilePath, options);

}

exports.deleteFromCloudinary = async (publicId, resourceType = "auto") => {
    try {
        const options = {
            resource_type: resourceType
        };

        return await cloudinary.uploader.destroy(publicId, options);

    } catch (error) {
        console.error("Error deleting file from Cloudinary:", error);
        throw error;
    }
};