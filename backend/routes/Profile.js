const express = require('express');
const router = express.Router();

const {
    auth,
    isInstructor
} = require("../middlewares/auth");

const {
    updateProfile,
    deleteAccount,
    getAllUserDetails,
    updateProfilePicture,
    getEnrolledCourses,
    instructorDashboard
} = require("../controllers/Profile");


router.put("/updateProfile", auth, updateProfile);
router.delete("/deleteAccount",auth ,deleteAccount);
router.get("/getUserDetails", auth,getAllUserDetails);
router.put("/updateProfilePicture", auth, updateProfilePicture);
router.get("/getEnrolledCourses", auth, getEnrolledCourses);
router.get("/instructorDashboard", auth, instructorDashboard);

module.exports = router;