const mongoose = require('mongoose');

const subSectionSchema = new mongoose.Schema({
    title: {
        type: String
    },
    timeDuration: {
        type: String
    },
    description: {
        type: String
    },
    video: {
        url: {
            type: String,
        },
        publicId: {
            type: String,
        }
    }
});

module.exports = mongoose.model("SubSection", subSectionSchema);