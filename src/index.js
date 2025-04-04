const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());

const studentRoutes = require("./routes/studentRoutes");
const courseRoutes = require("./routes/courseRoutes");
const enrollmentRoutes = require("./routes/enrollmentRoutes");
const infoRoutes = require("./routes/infoRoutes");

app.use("/info", infoRoutes);
app.use("/students", studentRoutes);
app.use("/courses", courseRoutes);
app.use("/enrollments", enrollmentRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
