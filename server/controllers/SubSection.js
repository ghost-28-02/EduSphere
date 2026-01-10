const SubSection = require("../models/SubSection");
const Section = require("../models/Section");
const { uploadToCloudinary } = require("../utils/cloudinaryUploader");
const { deleteFromCloudinary } = require("../utils/cloudinaryUploader");
require("dotenv").config();


exports.createSubSection = async (req, res) => {
    try {

        const { sectionId, title, timeDuration, description } = req.body;
        const video = req.files.videoFile;

        if (!sectionId || !title || !timeDuration || !description || !video) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        const uploadDetails = await uploadToCloudinary(video, process.env.FOLDER_NAME);

        const subSectionDetails = await SubSection.create({
            title,
            timeDuration,
            description,
            video: {
                url: uploadDetails.secure_url,
                publicId: uploadDetails.public_id
            }
        });

        const updatedSection = await Section.findByIdAndUpdate(
            sectionId,
            {
                $push: {
                    subSections: subSectionDetails._id
                }
            },
            {
                new: true
            }
        )
            .populate();

        return res.status(200).json({
            success: true,
            message: "Subsection created successfully"
        })


    } catch (error) {
<<<<<<< HEAD
        console.log("Error in creating subsection: ",error)
        return res.status(500).json({
            success: false,
            message: "Error in creating subsection",
            error:error
=======
        console.log("Error in creating subsection")
        return res.status(500).json({
            success: false,
            message: "Error in creating subsection"
>>>>>>> 04c45250e25853284f0d36bcfd7ff6937054727b
        })
    }
}


exports.updateSubSection = async (req, res) => {
    try {
        const { subSectionId, title, timeDuration, description } = req.body;
        const videoFile = req.files?.videoFile;

        // 1. Validation
        if (!subSectionId) {
            return res.status(400).json({
                success: false,
                message: "SubSection ID is required"
            });
        }

        // 2. Find existing subsection
        const subSection = await SubSection.findById(subSectionId);
        if (!subSection) {
            return res.status(404).json({
                success: false,
                message: "SubSection not found"
            });
        }

        // 3. Prepare update payload
        const updatePayload = {};
        if (title) updatePayload.title = title;
        if (timeDuration) updatePayload.timeDuration = timeDuration;
        if (description) updatePayload.description = description;

        // 4. If new video is provided
        if (videoFile) {
            // 4.1 Delete old video from Cloudinary
            if (subSection.video?.publicId) {
                await deleteFromCloudinary(subSection.video.publicId, "video");
            }

            // 4.2 Upload new video
            const uploadDetails = await uploadToCloudinary(
                videoFile,
                process.env.FOLDER_NAME
            );

            // 4.3 Update video object
            updatePayload.video = {
                url: uploadDetails.secure_url,
                publicId: uploadDetails.public_id
            };
        }

        // 5. Update subsection
        const updatedSubSection = await SubSection.findByIdAndUpdate(
            subSectionId,
            updatePayload,
            { new: true }
        );

        return res.status(200).json({
            success: true,
            message: "SubSection updated successfully",
            data: updatedSubSection
        });

    } catch (error) {
        console.error("Error in updateSubSection:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error while updating subsection"
        });
    }
};


exports.deleteSubSection = async (req, res) => {
    try {
        const { subSectionId, sectionId } = req.body;

        // 1. Validation
        if (!subSectionId || !sectionId) {
            return res.status(400).json({
                success: false,
                message: "SubSection ID and Section ID are required"
            });
        }

        // 2. Find subsection
        const subSection = await SubSection.findById(subSectionId);
        if (!subSection) {
            return res.status(404).json({
                success: false,
                message: "SubSection not found"
            });
        }

        // 3. Delete video from Cloudinary (if exists)
        if (subSection.video?.publicId) {
            await deleteFromCloudinary(subSection.video.publicId, "video");
        }

        // 4. Remove subsection reference from Section
        await Section.findByIdAndUpdate(
            sectionId,
            { $pull: { subSection: subSectionId } }
        );

        // 5. Delete subsection from DB
        await SubSection.findByIdAndDelete(subSectionId);

        return res.status(200).json({
            success: true,
            message: "SubSection deleted successfully"
        });

    } catch (error) {
        console.error("Error in deleteSubSection:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error while deleting subsection"
        });
    }
};

