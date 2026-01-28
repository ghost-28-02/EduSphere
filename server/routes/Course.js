const express = require('express');
const router = express.Router();

const {
    createCourse,
    getCourseDetails,
    getAllCourses
} = require("../controllers/Course");

const {
    createCategory,
    showAllCategory,
    categoryPageDetails
} = require("../controllers/Category");

const {
    createSection,
    updateSection,
    deleteSection
} = require("../controllers/Section")

const {
    createSubSection,
    updateSubSection,
    deleteSubSection
} = require("../controllers/SubSection");

const {
    createRating,
    getAverageRating,
    getAllRating
} = require("../controllers/RatingAndReview");

const {
    auth,
    isAdmin,
    isInstructor,
    isStudent
} = require("../middlewares/auth");


router.post("/createCourse",auth,isInstructor,createCourse);
router.post("/addSection",auth, isInstructor, createSection);
router.post("/updateSection", auth, isInstructor, updateSection);
router.post("/deleteSection", auth, isInstructor, deleteSection);
router.post("/addSubSection", auth, isInstructor, createSubSection);
router.post("/updateSubSection",auth, isInstructor, updateSubSection);
router.post("/deleteSubSection", auth, isInstructor, deleteSubSection);
router.get("/getAllCourses",getAllCourses);
router.post("/getCourseDetails",getCourseDetails);


router.post("/createCategory",auth, isAdmin, createCategory);
router.get("/showAllCategories",showAllCategory);
router.post("/getCategoryPageDetails",categoryPageDetails);

router.post("/createRating",auth, isStudent, createRating);
router.get("/getAverageRating",getAverageRating);
router.get("/getAllRating",getAllRating);

module.exports = router;