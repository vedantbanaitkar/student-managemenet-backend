const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.enrollStudent = async (req, res) => {
  try {
    const { student_id, course_id } = req.body;

    await prisma.enrollment.create({
      data: {
        studentId: student_id,
        courseId: course_id,
      },
    });

    res.status(201).json({ message: "Enrollment successful" });
  } catch (error) {
    console.error("Error enrolling student:", error);
    res.status(500).json({ error: "Enrollment failed" });
  }
};

exports.getStudentCourses = async (req, res) => {
  try {
    const { student_id } = req.params;

    const enrollments = await prisma.enrollment.findMany({
      where: { studentId: parseInt(student_id) },
      select: { courseId: true },
    });

    const courseIds = enrollments.map((e) => e.courseId);

    res.status(200).json({ enrolled_courses: courseIds });
  } catch (error) {
    console.error("Error fetching student courses:", error);
    res.status(500).json({ error: "Failed to get enrolled courses" });
  }
};
