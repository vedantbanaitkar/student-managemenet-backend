const express = require("express");
const router = express.Router();
const enrollmentController = require("../controllers/enrollmentController");

router.post("/", enrollmentController.enrollStudent);
router.get(
  "/students/:student_id/courses",
  enrollmentController.getStudentCourses
);

module.exports = router;
