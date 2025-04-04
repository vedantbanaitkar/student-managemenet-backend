const express = require("express");
const router = express.Router();
const studentController = require("../controllers/studentController");

// Route to create student
router.post("/", studentController.createStudent);

// Route to get all students
router.get("/", studentController.getAllStudents);

// Route to get a student by ID
router.get("/:id", studentController.getStudent);

module.exports = router;
