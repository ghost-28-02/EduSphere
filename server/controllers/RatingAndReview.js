const RatingAndReview = require("../models/RatingAndReview");
const Course = require("../models/Course");
const mongoose = require("mongoose");

exports.createRating = async (req, res) => {
    try {
        const userId = req.user.id;
        const { rating, review, courseId } = req.body;

        if(!rating || !review || !courseId){
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        // Check if course exists
        const course = await Course.findById(courseId);
        if(!course){
            return res.status(404).json({
                success: false,
                message: "Course not found"
            });
        }

        // Check if user is enrolled in the course
        if(!course.studentEnrolled.includes(userId)){
            return res.status(403).json({
                success: false,
                message: "User is not enrolled in this course"
            });
        }

        // Check if user already reviewed this course
        const alreadyReviewed = await RatingAndReview.findOne({
            user: userId,
            course: courseId
        });

        if(alreadyReviewed){
            return res.status(400).json({
                success: false,
                message: "User has already reviewed this course"
            });
        }

        // Create rating and review
        const ratingResponse = await RatingAndReview.create({
            user: userId,
            rating: rating,
            review: review,
            course: courseId
        });

        // Update course with new rating
        await Course.findByIdAndUpdate(
            courseId,
            {
                $push: {
                    ratingAndReviews: ratingResponse._id
                }
            },
            { new: true }
        );

        return res.status(200).json({
            success: true,
            message: "Rating created successfully",
            data: ratingResponse
        });

    } catch (error) {
        console.log("Error in creating rating: ", error);
        return res.status(500).json({
            success: false,
            message: "Error in creating rating",
            error: error.message
        });
    }
}

exports.getAverageRating = async (req, res) => {
    try {
        const { courseId } = req.body;

        if(!courseId){
            return res.status(400).json({
                success: false,
                message: "Course ID is required"
            });
        }

        // Calculate average rating using aggregation
        const result = await RatingAndReview.aggregate([
            {
                $match: {
                    course: new mongoose.Types.ObjectId(courseId)
                }
            },
            {
                $group: {
                    _id: null,
                    averageRating: { $avg: "$rating" }
                }
            }
        ]);

        if(result.length > 0){
            return res.status(200).json({
                success: true,
                averageRating: result[0].averageRating
            });
        }

        // No ratings exist
        return res.status(200).json({
            success: true,
            message: "No ratings found for this course",
            averageRating: 0
        });

    } catch (error) {
        console.log("Error in getting average rating: ", error);
        return res.status(500).json({
            success: false,
            message: "Error in getting average rating",
            error: error.message
        });
    }
}

exports.getAllRating = async (req, res) => {
    try {
        const allReviews = await RatingAndReview.find({})
            .sort({ rating: "desc" })
            .populate({
                path: "user",
                select: "firstName lastName email image"
            })
            .populate({
                path: "course",
                select: "courseName"
            })
            .exec();

        return res.status(200).json({
            success: true,
            message: "All reviews fetched successfully",
            data: allReviews
        });

    } catch (error) {
        console.log("Error in getting all ratings: ", error);
        return res.status(500).json({
            success: false,
            message: "Error in getting all ratings",
            error: error.message
        });
    }
}
