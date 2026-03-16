const express = require("express");
const router = express.Router();

const {capturePayment, verifyPayments, sendPaymentSuccessEmail } = require("../controllers/Payments");
const { auth, isAdmin, isStudent, isInstructor} = require("../middlewares/auth");

router.post("/capturePayment", auth, isStudent, capturePayment);
router.post("/verifyPayment", auth, isStudent, verifyPayments);
router.post("/sendPaymentSuccessEmail", auth, isStudent, sendPaymentSuccessEmail);


module.exports = router;