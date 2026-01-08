const Category = require("../models/Categorys")


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
            allCategory
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
