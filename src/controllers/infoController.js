exports.getInfo = (req, res) => {
  res.json({
    message: "Welcome to the Student Management API!",
    endpoints: {
      students: {
        create: {
          method: "POST",
          url: "/students",
          body: {
            name: "string",
            age: "number",
            email: "string",
          },
        },
        get: {
          method: "GET",
          url: "/students/:id",
          response: {
            id: "number",
            name: "string",
            age: "number",
            email: "string",
          },
        },
      },
      courses: {
        create: {
          method: "POST",
          url: "/courses",
          body: {
            title: "string",
            description: "string",
          },
        },
        get: {
          method: "GET",
          url: "/courses/:id",
          response: {
            id: "number",
            title: "string",
            description: "string",
          },
        },
      },
      enrollments: {
        create: {
          method: "POST",
          url: "/enrollments",
          body: {
            student_id: "number",
            course_id: "number",
          },
        },
        getStudentCourses: {
          method: "GET",
          url: "/students/:student_id/courses",
          response: {
            enrolled_courses: ["number"],
          },
        },
      },
    },
    note: "All responses are in JSON format. Use appropriate headers (e.g., Content-Type: application/json) for API interaction.",
  });
};
