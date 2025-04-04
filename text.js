// test.js
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function test() {
  try {
    const student = await prisma.student.create({
      data: {
        name: "Test User",
        age: 20,
        email: "test@example.com",
      },
    });
    console.log(student);
  } catch (err) {
    console.error(err);
  } finally {
    await prisma.$disconnect();
  }
}

test();
