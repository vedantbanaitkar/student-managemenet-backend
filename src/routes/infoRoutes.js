const express = require("express");
const router = express.Router();
const infoController = require("../controllers/infoController");

router.get("/", infoController.getInfo);

module.exports = router;
