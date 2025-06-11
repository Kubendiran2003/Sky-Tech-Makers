// /server/routes/toolRoutes.js
const express = require("express");
const { jsonFormatter } = require("../controllers/toolController");
const router = express.Router();

router.post("/json-formatter", jsonFormatter);

module.exports = router;