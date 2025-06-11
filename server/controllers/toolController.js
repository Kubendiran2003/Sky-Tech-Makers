// /server/controllers/toolController.js
exports.jsonFormatter = (req, res) => {
  try {
    const formatted = JSON.stringify(JSON.parse(req.body.json), null, 2);
    res.send(formatted);
  } catch (e) {
    res.status(400).send("Invalid JSON");
  }
};