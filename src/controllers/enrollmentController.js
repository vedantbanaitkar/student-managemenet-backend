const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.enrollStudent = async (req, res) => {
  try {
    const { student_id, course_id } = req.body;

    // Validate input
    if (!student_id || !course_id) {
      return res
        .status(400)
        .json({ error: "Student ID and Course ID are required" });
    }

    // Check if student exists
    const student = await prisma.student.findUnique({
      where: { id: student_id },
    });
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    // Check if course exists
    const course = await prisma.course.findUnique({
      where: { id: course_id },
    });
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    // Check if enrollment already exists
    const existingEnrollment = await prisma.enrollment.findFirst({
      where: {
        studentId: student_id,
        courseId: course_id,
      },
    });
    if (existingEnrollment) {
      return res
        .status(400)
        .json({ error: "Student is already enrolled in this course" });
    }

    await prisma.enrollment.create({
      data: {
        studentId: student_id,
        courseId: course_id,
      },
    });

    res.status(201).json({ message: "Enrollment successful" });
  } catch (error) {
    console.error("Error enrolling student:", error);
    res
      .status(500)
      .json({ error: "Failed to enroll student: " + error.message });
  }
};

exports.getStudentCourses = async (req, res) => {
  try {
    const { student_id } = req.params;

    // Validate student_id
    if (!student_id) {
      return res.status(400).json({ error: "Student ID is required" });
    }

    // Check if student exists
    const student = await prisma.student.findUnique({
      where: { id: parseInt(student_id) },
    });
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    // Get enrollments with course details
    const enrollments = await prisma.enrollment.findMany({
      where: { studentId: parseInt(student_id) },
      include: {
        course: true,
      },
    });

    // Extract course information
    const courses = enrollments.map((enrollment) => enrollment.course);

    res.status(200).json({ courses });
  } catch (error) {
    console.error("Error fetching student courses:", error);
    res
      .status(500)
      .json({ error: "Failed to fetch student courses: " + error.message });
  }
};
