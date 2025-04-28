const express = require("express");
const router = express.Router();
const courseController = require("../controllers/courseController");

router.post("/", courseController.createCourse);
router.get("/", courseController.getAllCourses);
router.get("/:id", courseController.getCourse);

module.exports = router;
