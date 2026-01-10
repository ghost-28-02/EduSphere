const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    courseName: {
        type: String
    },
    courseDescription: {
        type: String
    },
    instructor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    whatYouWillLearn: {
        type: String
    },
    courseContent: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Section"
        }
    ],
    ratingAndReviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "RatingAndReview"
        }
    ],
    price: {
        type: Number
    },
    thumbnail: {
        type: String
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category"
    },
<<<<<<< HEAD
    tags: {
        type: [String],
        required: true
    },
=======
    tags: [
        {
            type: String
        }
    ],
>>>>>>> 04c45250e25853284f0d36bcfd7ff6937054727b
    studentEnrolled: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        }
<<<<<<< HEAD
    ],
    instructions: {
        type: [String]
    },
    status: {
        type: String,
        enum:["Draft", "Published"]
    }
=======
    ]
>>>>>>> 04c45250e25853284f0d36bcfd7ff6937054727b
});

module.exports = mongoose.model("Course",courseSchema);