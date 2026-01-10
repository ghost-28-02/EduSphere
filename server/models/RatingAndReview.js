const mongoose = require('mongoose');

const ratingAndReviewSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    rating: {
        type: Number,
        required: true
    },
    review: {
        type: String,
        required: true
<<<<<<< HEAD
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Course",
        index:  true
=======
>>>>>>> 04c45250e25853284f0d36bcfd7ff6937054727b
    }
});

module.exports = mongoose.model("RatingAndReview",ratingAndReviewSchema);