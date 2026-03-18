const Profile = require("../models/Profile");
const User = require("../models/User");
const Course = require("../models/Course")
const CourseProgress = require("../models/CourseProgress");
const { uploadToCloudinary } = require("../utils/cloudinaryUploader");
const { convertSecondsToDuration } = require("../utils/secToDuration")
const mongoose = require("mongoose")



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

        let userDetails = await User.findById(id);
        const profileId = userDetails.additionalDetails;
        const profileDetails = await Profile.findById(profileId);

        profileDetails.dateOfBirth = dateOfBirth;
        profileDetails.about = about;
        profileDetails.contactNumber = contactNumber;
        profileDetails.gender = gender;
        await profileDetails.save();

        const data = await User.findById(id).populate("additionalDetails").exec();

        return res.status(200).json({
            success: true,
            message: "Profile details updated successfully",
            data: data
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
                    { $pull: { studentEnrolled: id } }
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

        if (!profilePicture) {
            return res.status(404).json({
                success: false,
                message: "All fileds are required"
            });
        }

        const response = await uploadToCloudinary(profilePicture, process.env.FOLDER_NAME);

        if (!response) {
            return res.status(400).json({
                success: false,
                message: "Error in cloudinary upload"
            });
        }

        const userResponse = await User.findByIdAndUpdate(
            userId,
            { image: response.secure_url },
            { new: true }
        );

        return res.status(200).json({
            success: true,
            message: "image updated successfully",
            data: userResponse
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

exports.getEnrolledCourses = async (req, res) => {
    try {
        const userId = req.user.id
        let userDetails = await User.findOne({
            _id: userId,
        })
            .populate({
                path: "courses",
                populate: {
                    path: "courseContent",
                    populate: {
                        path: "subSections",
                    },
                },
            })
            .exec()
        userDetails = userDetails.toObject()
        var SubsectionLength = 0
        for (var i = 0; i < userDetails.courses.length; i++) {
            let totalDurationInSeconds = 0
            SubsectionLength = 0
            for (var j = 0; j < userDetails.courses[i].courseContent.length; j++) {
                totalDurationInSeconds += userDetails.courses[i].courseContent[
                    j
                ].subSections.reduce((acc, curr) => acc + parseInt(curr.timeDuration), 0)
                userDetails.courses[i].totalDuration = convertSecondsToDuration(
                    totalDurationInSeconds
                )
                SubsectionLength +=
                    userDetails.courses[i].courseContent[j].subSections.length
            }
            let courseProgressCount = await CourseProgress.findOne({
                courseID: userDetails.courses[i]._id,
                userId: userId,
            })
            courseProgressCount = courseProgressCount?.completedVideos.length
            if (SubsectionLength === 0) {
                userDetails.courses[i].progressPercentage = 100
            } else {
                // To make it up to 2 decimal point
                const multiplier = Math.pow(10, 2)
                userDetails.courses[i].progressPercentage =
                    Math.round(
                        (courseProgressCount / SubsectionLength) * 100 * multiplier
                    ) / multiplier
            }
        }

        if (!userDetails) {
            return res.status(400).json({
                success: false,
                message: `Could not find user with id: ${userDetails}`,
            })
        }
        return res.status(200).json({
            success: true,
            data: userDetails.courses,
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

exports.instructorDashboard = async (req, res) => {
    try {
        const courseDetails = await Course.find({ instructor: req.user.id })

        const courseData = courseDetails.map((course) => {
            const totalStudentsEnrolled = course.studentEnrolled.length
            const totalAmountGenerated = totalStudentsEnrolled * course.price

            // Create a new object with the additional fields
            const courseDataWithStats = {
                _id: course._id,
                courseName: course.courseName,
                courseDescription: course.courseDescription,
                // Include other course properties as needed
                totalStudentsEnrolled,
                totalAmountGenerated,
            }

            return courseDataWithStats
        })

        res.status(200).json({success: true,  courses: courseData })
    } catch (error) {
        console.error(error)
        res.status(500).json({success: false, message: "Server Error" })
    }
}
