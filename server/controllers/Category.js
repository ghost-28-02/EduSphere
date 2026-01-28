const Category = require("../models/Category")

exports.createCategory = async (req, res) => {
    try {
        
        const { name, description } = req.body;

        if(!name || !description){
            return res.status(404).json({
                success: false,
                message: "All fields are required"
            })
        }

        const categoryDetails = await Category.create(
            {
                name: name,
                description: description
            }
        );

        return res.status(200).json({
            success: true,
            message: "Category created successfully"
        });


    } catch (error) {
        console.log("Error in Category creation: ", error);
        return res.status(500).json({
            success: false,
            message: "Error in Category creation",
            error: error.message
        });
    }
}

exports.showAllCategory = async (req, res) => {
    try {
        const allCategorys = await Category.find({}, {name: true, description: true});

        return res.status(200).json({
            success: true,
            message: "All Category returned successfully",
            allCategorys
        })
    } catch (error) {
        console.log("Error in Category creation: ", error);
        return res.status(500).json({
            success: false,
            message: "Error in Category creation",
            error: error.message
        });
    }
}

exports.categoryPageDetails = async (req, res) => {
    try {
        
        const {categoryId} = req.body;

        if(!categoryId){
            return res.status(400).json({
                success: false,
                message: "Category ID is required"
            });
        }

        // Get selected category with its courses
        const selectedCategory = await Category.findById(categoryId)
            .populate({
                path: "course",
                populate: {
                    path: "instructor"
                }
            })
            .exec();

        if(!selectedCategory){
            return res.status(404).json({
                success: false,
                message: "Category not found"
            });
        }

        // Get different categories (excluding selected one)
        const differentCategories = await Category.find(
            {
                _id: {$ne: categoryId},
            }
        )
        .populate("course")
        .exec();

        // Get top-selling courses across all categories
        const allCategories = await Category.find()
            .populate({
                path: "course",
                options: { sort: { studentEnrolled: -1 }, limit: 10 },
                populate: {
                    path: "instructor"
                }
            })
            .exec();
        
        // Extract top courses from all categories
        const topSellingCourses = allCategories
            .flatMap(category => category.course)
            .sort((a, b) => b.studentEnrolled.length - a.studentEnrolled.length)
            .slice(0, 10);

        return res.status(200).json({
            success: true,
            data: {
                selectedCategory,
                differentCategories,
                topSellingCourses
            }
        });

    } catch (error) {
        console.log("Error in category page details: ", error);
        return res.status(500).json({
            success: false,
            message: "Error in fetching category page details",
            error: error.message
        });
    }
}



