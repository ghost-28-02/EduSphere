const { instance } = require("../config/razorpay");
const Course = require("../models/Course");
const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const { courseEnrollmentTemplate } = require("../mail/templates/courseEnrollment");
const mongoose = require("mongoose");
const { paymentSuccessEmailTemplate } = require("../mail/templates/paymentSuccessEmail");
const crypto = require("crypto");
const CourseProgress = require("../models/CourseProgress");

exports.capturePayment = async (req, res) => {

    const { courses } = req.body;
    const userId = req.user.id;

    if (courses?.length === 0) {
        return res.status(400).json({
            success: false,
            message: "Please Provide Course Id"
        });
    }

    let totalAmount = 0;

    for (const course_id of courses) {
        let course;
        try {
            course = await Course.findById(course_id);
            if (!course) {
                return res.status(400).json({
                    success: false,
                    message: `Course not found for course_id ${course_id}`
                })
            }

            const uid = new mongoose.Types.ObjectId(userId)

            if (course.studentEnrolled.includes(uid)) {
                return res.status(300).json({
                    success: false,
                    message: `Student already enrolled in course ${course.courseName}`
                })
            }

            totalAmount += course.price;
        } catch (error) {
            console.log(error)
            res.status(500).json({
                success: false,
                message: error.message
            })
        }
    }

    const options = {
        amount: totalAmount * 100,
        currency: "INR",
        receipt: Math.random(Date.now()).toString()
    }

    try {
        const paymentResponse = await instance.orders.create(options);
        res.status(200).json({
            success: true,
            message: paymentResponse,
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: error.message
        })
    }

}

const enrolledStudents = async (courses, userId, res) => {

    if (!courses || !userId) {
        return res.status(404).json({
            success: false,
            message: "All fields required!"
        })
    }

    for (const course of courses) {
        try {
            const enrolledCourse = await Course.findByIdAndUpdate(
                { _id: course },
                {
                    $push: { studentEnrolled: userId }
                },
                { new: true }
            )

            if (!enrolledCourse) {
                return res.status(404).json({
                    success: false,
                    message: "Course not found"
                })
            }

            const courseProgress = await CourseProgress.create({
                courseID:course,
                userId:userId,
                completedVideos: []
            })

            const enrolledStudent = await User.findByIdAndUpdate(
                { _id: userId },
                {
                    $push: { courses: course, courseProgress:  courseProgress._id}
                },
                { new: true }
            )

            if (!enrolledStudent) {
                return res.status(404).json({
                    success: false,
                    message: "User not found"
                })
            }

            const name = `${enrolledStudent.firstName} ${enrolledStudent.lastName}`

            const emailResponse = await mailSender(
                enrolledStudent.email,
                "Course Enrollment Successful",
                courseEnrollmentTemplate(enrolledCourse.courseName, name)
            );
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                success: false,
                message: error.message
            })
        }

    }
}

exports.sendPaymentSuccessEmail = async (req, res) => {
    try {
        const { amount, orderId, paymentId } = req.body;
        const userId = req.user.id;

        if (!amount || !orderId || !paymentId) {
            return res.status(400).json({
                success: false,
                message: "courseName and amount are required",
            });
        }

        const user = await User.findById(userId);
        const name = `${user.firstName} ${user.lastName}`;
        const Amount = amount/100;

        await mailSender(
            user.email,
            "Payment Successful",
            paymentSuccessEmailTemplate({
                name,
                Amount,
                orderId,
                paymentId,
            })
        );

        return res.status(200).json({
            success: true,
            message: "Payment success email sent",
        });
    } catch (error) {
        console.log("sendPaymentSuccessEmail error:", error);
        return res.status(500).json({
            success: false,
            message: "Could not send payment success email",
            error: error.message,
        });
    }
};

exports.verifyPayments = async (req, res) => {
    const razorpay_order_id = req.body?.razorpay_order_id;
    const razorpay_payment_id = req.body?.razorpay_payment_id;
    const razorpay_signature = req.body?.razorpay_signature
    const courses = req.body?.courses;
    const userId = req.user.id;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !courses || !userId) {
        req.status(404).json({
            success: false,
            message: "Payment Failed"
        })
    }

    let body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_SECRET)
        .update(body.toString())
        .digest("hex");

    if (expectedSignature === razorpay_signature) {

        await enrolledStudents(courses, userId, res);



        return res.status(200).json({
            success: true,
            message: "Payment Verified"
        })
    }

    return res.status(500).json({
        success: false,
        message: "Payment Failed"
    })


}


// exports.capturePayment = async (req, res) => {
//     try {
//         const { courseId } = req.body;
//         const userId = req.user.id;

//         if (!courseId) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Course ID is required",
//             });
//         }

//         const course = await Course.findById(courseId);

//         if (!course) {
//             return res.status(404).json({
//                 success: false,
//                 message: "Course not found",
//             });
//         }

//         const uid = new mongoose.Types.ObjectId(userId);

//         if (course.studentEnrolled.includes(uid)) {
//             return res.status(409).json({
//                 success: false,
//                 message: "User already enrolled in this course",
//             });
//         }

//         const options = {
//             amount: course.price * 100,
//             currency: "INR",
//             receipt: crypto.randomUUID(),
//             notes: {
//                 courseId,
//                 userId,
//             },
//         };

//         const paymentResponse = await instance.orders.create(options);

//         return res.status(200).json({
//             success: true,
//             courseName: course.courseName,
//             courseDescription: course.courseDescription,
//             thumbnail: course.thumbnail,
//             orderId: paymentResponse.id,
//             currency: paymentResponse.currency,
//             amount: paymentResponse.amount,
//         });

//     } catch (error) {
//         console.error("Error in capturePayment:", error);

//         return res.status(500).json({
//             success: false,
//             message: "Could not initiate payment",
//         });
//     }
// };

// exports.verifySignature = async (req, res) => {
//     try {

//         const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;
//         const razorpaySignature = req.headers["x-razorpay-signature"];

//         const shasum = crypto.createHmac("sha256", webhookSecret);
//         shasum.update(JSON.stringify(req.body));
//         const digest = shasum.digest("hex");

//         if (digest !== razorpaySignature) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Invalid webhook signature",
//             });
//         }

//         console.log("Webhook verified successfully");

//         const { courseId, userId } = req.body?.payload?.payment?.entity?.notes;

//         const course = await Course.findById(courseId);
//         if (!course) {
//             return res.status(404).json({
//                 success: false,
//                 message: "Course not found",
//             });
//         }

//         if (course.studentEnrolled.includes(userId)) {
//             return res.status(200).json({
//                 success: true,
//                 message: "User already enrolled (duplicate webhook)",
//             });
//         }

//         const enrolledCourse = await Course.findByIdAndUpdate(
//             { courseId },
//             {
//                 $push: {
//                     studentEnrolled: userId
//                 }
//             },
//             {
//                 new: true
//             }
//         );

//         if (!enrolledCourse) {
//             return res.status(404).json({
//                 success: false,
//                 message: "Course not found"
//             });
//         };

//         const enrolledStudent = await User.findByIdAndUpdate(
//             { userId },
//             {
//                 $push: {
//                     courses: courseId
//                 }
//             },
//             {
//                 new: true
//             }
//         );

//         const name = `${enrolledStudent.firstName} ${enrolledStudent.lastName}`

//         const emailResponse = await mailSender(
//             enrolledStudent.email,
//             "Course Enrollment Successful",
//             courseEnrollmentTemplate(enrolledCourse.courseName, name)
//         );

//         return res.status(200).json({
//             success: true,
//             message: "Course enrolled successfully"
//         });


//     } catch (error) {
//         console.log("Webhook error: ", error);
//         return res.status(500).json({
//             success: false,
//             message: "Webhook processing failed",
//             error: error.message
//         });
//     }
// }
