// src/controllers/studentController.js
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.createStudent = async (req, res) => {
  try {
    const { name, age, email } = req.body;

    const student = await prisma.student.create({
      data: {
        name,
        age: Number(age),
        email,
      },
    });

    res.status(201).json(student);
  } catch (error) {
    console.error("❌ Error creating student:", error); // log full error
    res.status(500).json({ error: "Failed to create student" });
  }
};

exports.getAllStudents = async (req, res) => {
  try {
    const students = await prisma.student.findMany();
    res.status(200).json(students);
  } catch (error) {
    console.error("Error fetching students:", error);
    res.status(500).json({ error: "Failed to fetch students" });
  }
};


exports.getStudent = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const student = await prisma.student.findUnique({ where: { id } });
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }
    res.json(student);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch student" });
  }
};
