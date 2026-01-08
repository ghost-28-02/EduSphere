const Course = require("../models/Course");
const Category = require("../models/Category");
const User = require("../models/User");
const { uploadToCloudinary } = require("../utils/cloudinaryUploader");


exports.createCourse = async (req, res) => {
    try {
        
        const { courseName, courseDescription, whatYouWillLearn, price, category, tag} = req.body;
        const thumbnail = req.files.thumbnailImage;

        if(!courseName || !courseDescription || !whatYouWillLearn || !price || !category || !thumbnail){
            return res.status(404).json({
                success: false,
                message: "All fileds required"
            });
        }

        const userId = req.user.id;
        const instructerDetils = await User.findById(userId);
        if(!instructerDetils){
            return res.status(404).json({
                success: false,
                message: "Instructor Details not found"
            })
        };

        const categoryDetails = await Category.findById(category);
        if(!categoryDetails){
            return res.status(404).json({
                success: false,
                message: "Category Details not found"
            })
        }

        const thumbnailImage = await uploadToCloudinary(thumbnail, process.env.FOLDER_NAME);

        const newCourse = await Course.create({
            courseName,
            courseDescription,
            instructor:instructerDetils._id,
            whatYouWillLearn: whatYouWillLearn,
            price,
            category:category,
            tags: tag,
            thumbnail: thumbnailImage.secure_url
        });

        await User.findByIdAndUpdate(
            {
                _id: instructerDetils._id
            },
            {
                $push: {
                    courses: newCourse._id
                }
            },
            {
                new: true
            }
        );

        await Category.findByIdAndUpdate(
            {_id: categoryDetails._id},
            {
                $push: {
                    courses: newCourse._id
                }
            },
            {
                new: true
            }
        );

        return res.status(200).json({
            success: true,
            message: "Course created successfully",
            data: newCourse
        });

    } catch (error) {
        console.log("Error in Course Creation: ", error);
        return res.status(500).json({
            success: false,
            message: "Error in Course Creation",
            error: error.message
        });
    }
}

exports.showAllCourses = async (req, res) => {
    try {
        
        const allCourses = await Course.find({}, {courseName: true, price: true, thumbnail: true, instructor: true, ratingAndReviews: true, studentEnrolled: true}).populate("Instructor").exec();

        return res.status(200).json({
            success: true,
            message: "Data for all courses fetched successfully",
            data: allCourses
        });


    } catch (error) {
        console.log("Error in get all courses", error);
        return res.status(500).json({
            success: false,
            message: "Error in get all courses",
            error: error.message
        });
    }
}