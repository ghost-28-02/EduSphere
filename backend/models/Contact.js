const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema(
  {
    firstName: { 
      type: String, 
      required: true 
    },
    lastName: { 
      type: String, 
      required: true 
    },
    email: { 
      type: String, 
      required: true 
    },
    phoneNo: { 
      type: String 
    },
    countryCode: { 
      type: String 
    },
    message: { 
      type: String, 
      required: true 
    },
    status: {
      type: String,
      enum: ["new", "replied", "closed"],
      default: "new"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Contact", contactSchema);