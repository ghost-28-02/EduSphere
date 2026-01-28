const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/User");

//auth
exports.auth = async (req, res, next) => {
    try {
        const token = req.cookies.token || req.body.token || req.header("Authorisation").replace("Bearer ","");

        if(!token){
            return res.status(400).json({
                success: false,
                message: "Token is missing"
            });
        }

        try {
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decode;
        } catch (error) {
            console.log("Issue in token verification")
            return res.status(400).json({
                success: false,
                message: "Issue in token verification",
                error: error.message
            });
        }
        next();
    } catch (error) {
        console.log("Issue in auth middleware")
        return res.status(400).json({
            success: false,
            message: "Issue in token verification",
            error: error.message
        })
    }
}

//isStudent
exports.isStudent = async (req, res, next) => {

    try {
        
        if(req.user.accountType !== "Student"){
            return res.status(401).json({
                success: false,
                message: "This is a protected route for Student only"
            })
        }
        next();
    } catch (error) {
        console.log("Issue in isStudent middleware")
        return res.status(400).json({
            success: false,
            message: "Issue in isStudent middleware",
            error: error.message
        })
    }
}


//isInstructor
exports.isInstructor = async (req, res, next) => {
    try {
        
        if(req.user.accountType !== "Instructor"){
            return res.status(401).json({
                success: false,
                message: "This is a protected route for Instructor only"
            })
        }
        next();
    } catch (error) {
        console.log("Issue in isInstructor middleware")
        return res.status(400).json({
            success: false,
            message: "Issue in isInstructor middleware",
            error: error.message
        })
    }
}


//isAdmin
exports.isAdmin = async (req, res, next) => {
    try {
        
        if(req.user.accountType !== "Admin"){
            return res.status(401).json({
                success: false,
                message: "This is a protected route for Admin only"
            })
        }
        next();
    } catch (error) {
        console.log("Issue in isAdmin middleware")
        return res.status(400).json({
            success: false,
            message: "Issue in isAdmin middleware",
            error: error.message
        })
    }
}