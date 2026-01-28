const Profile = require("../models/Profile");
const User = require("../models/User");
const Course = require("../models/Course")
const CourseProgress = require("../models/CourseProgress");
const { uploadToCloudinary } = require("../utils/cloudinaryUploader");


exports.updateProfile = async (req, res) => {
    try {

        const { dateOfBirth = "", about = "", contactNumber, gender } = req.body;
        const id = req.user.id;

        if (!contactNumber || !gender) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }

        const userDetails = await User.findById(id);
        const profileId = userDetails.additionalDetails;
        const profileDetails = await Profile.findById(profileId);

        profileDetails.dateOfBirth = dateOfBirth;
        profileDetails.about = about;
        profileDetails.contactNumber = contactNumber;
        profileDetails.gender = gender;
        await profileDetails.save();

        return res.status(200).json({
            success: true,
            message: "Profile details updated successfully",
            profileDetails,
        })


    } catch (error) {
        console.log("Error in updating profile");
        return res.status(500).json({
            success: false,
            message: "Error in updating profile",
            error: error.message
        })
    }
}

exports.deleteAccount = async (req, res) => {
    try {

        const id = req.user.id;
        const userDetails = await User.findById(id);

        if (!userDetails) {
            return res.status(404).json({
                success: false,
                message: "user not found"
            })
        }

        await Promise.all(
            userDetails.courses.map(course => 
                Course.findByIdAndUpdate(course,
                    { $pull: { studentEnrolled: id }}
                )
            )
        );

        await Promise.all(
            userDetails.courseProgress.map(courseProgressId => 
                CourseProgress.findByIdAndDelete(courseProgressId)
            )
        )

        await Profile.findByIdAndDelete(userDetails.additionalDetails);
        await User.findByIdAndDelete(id);

        return res.status(200).json({
            success: true,
            message: "Account deleted successfully"
        })

    } catch (error) {
        console.log("Error in deleting Account")
        return res.status(500).json({
            success: false,
            message: "Error in deleting account",
            error: error.message
        })
    }
}

exports.getAllUserDetails = async (req, res) => {
    try {

        const id = req.user.id;
        const userDetails = await User.findById(id).populate("additionalDetails").exec();

        return res.status(200).json({
            success: true,
            message: "User data fetched successfully",
            userDetails
        })
        
    } catch (error) {
        console.log("Error in geting user details")
        return res.status(500).json({
            success: false,
            message: "Error in geting user details",
            error: error.message
        })
    }
}

exports.updateProfilePicture = async (req, res) => {
    try {
        const userId = req.user.id;
        const profilePicture = req.files.displayPicture;

        if(!profilePicture){
            return res.status(404).json({
                success: false,
                message: "All fileds are required"
            });
        }

        const response = await uploadToCloudinary(profilePicture, process.env.FOLDER_NAME);

        if(!response){
            return res.status(400).json({
                success: false,
                message: "Error in cloudinary upload"
            });
        }

        const userResponse = await User.findByIdAndUpdate(
            userId,
            {image: response.secure_url},
            {new: true}
        );

        return res.status(200).json({
            success: true,
            message: "image updated successfully"
        });

    } catch (error) {
        console.log("Error in profile image update: ", error);
        return res.status(500).json({
            success: false,
            message: "Error in profile image update",
            error: error
        });
    }
}