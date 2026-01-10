const Section = require("../models/Section");
const Course = require("../models/Course");

exports.createSection = async (req, res) => {
    try {
        const {sectionName, courseId} = req.body;
        if(!sectionName || !courseId){
            return res.status(400).json({
                success: false,
                message: "All fields required"
            })       
        }

        const newSection = await Section.create({sectionName});

        const updatedCourseDetails = await Course.findByIdAndUpdate(
            courseId,
            {
                $push: {
                    courseContent: newSection._id
                }
            },
            {
                new: true
            }
        )
        .populate({
            path: "courseContent",
            populate: {
                path: "subSections"
            }
<<<<<<< HEAD
        }).exec();
=======
        });
>>>>>>> 04c45250e25853284f0d36bcfd7ff6937054727b

        return res.status(200).json({
            success: true,
            message: "Section created successfully",
            updatedCourseDetails,
        })
    } catch (error) {
        console.log("Error in create section");
        return res.status(500).json({
            success: false,
            message: "Error in create section",
            error: error.message
        })
    }
}

exports.updateSection = async (req, res) => {
    try {
        
        const {sectionName, sectionId} = req.body;

        if(!sectionName || !sectionId){
            return res.status(400).json({
                success: false,
                message: "All fields required"
            })   
        }

        const section = await Section.findByIdAndUpdate(
            sectionId,
            {
<<<<<<< HEAD
                sectionName: sectionName
=======
                $push: {
                    sectionName: sectionName
                }
>>>>>>> 04c45250e25853284f0d36bcfd7ff6937054727b
            },
            {
                new: true
            }
        )

        return res.status(200).json({
            success: true,
            message: "Section updated successfully"
        });

    } catch (error) {
        console.log("Error in update section");
        return res.status(500).json({
            success: false,
            message: "Error in update section",
            error: error.message
        })
    }
}

exports.deleteSection = async (req, res) =>{
    try {
        
<<<<<<< HEAD
        const {sectionId, courseId} = req.body;
=======
        const {sectionId} = req.params;
>>>>>>> 04c45250e25853284f0d36bcfd7ff6937054727b

        if(!sectionId){
            return res.status(400).json({
                success: false,
<<<<<<< HEAD
                message: "Section ID is required"
=======
                message: "All fields required"
>>>>>>> 04c45250e25853284f0d36bcfd7ff6937054727b
            }) 
        }

        await Section.findByIdAndDelete(sectionId);
<<<<<<< HEAD
        await Course.findByIdAndUpdate(
            courseId,
            {
                $pull: {
                    courseContent:sectionId
                }
            }
        );
=======
        //TODO should we delete the id from course also
>>>>>>> 04c45250e25853284f0d36bcfd7ff6937054727b

        return res.status(200).json({
            success: true,
            message: "Section deleted successfully"
        })

    } catch (error) {
        console.log("Error in delete section");
        return res.status(500).json({
            success: false,
            message: "Error in delete section",
            error: error.message
        })
    }
}