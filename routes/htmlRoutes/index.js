//required variables
const path = require("path");
const router = require("express").Router();

//html routes
router.get("/notes", (_, res) => {
  res.sendFile(path.join(__dirname, "../../public/notes.html"));
});

router.get("/", (_, res) => {
  res.sendFile(path.join(__dirname, "../../public/index.html"));
});

router.get("*", (_, res) => {
  res.sendFile(path.join(__dirname, "../../public/index.html"));
});

module.exports = router;