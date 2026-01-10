const cloudinary = require('cloudinary').v2;


exports.uploadToCloudinary = async (file, folder, height, quality) => {

    const options = { folder }

    if (height) {
        options.height = height
    }
    if (quality) {
        options.quality = quality
    }
<<<<<<< HEAD
    options.resource_type = "auto";
=======
    options.resourse_type = "auto";
>>>>>>> 04c45250e25853284f0d36bcfd7ff6937054727b

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