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
    updateProfilePicture
} = require("../controllers/Profile");


router.put("/updateProfile", auth, updateProfile);
router.delete("/deleteAccount",auth ,deleteAccount);
router.get("/getUserDetails", auth,getAllUserDetails);
router.put("/updateProfilePicture", auth, updateProfilePicture);

module.exports = router;