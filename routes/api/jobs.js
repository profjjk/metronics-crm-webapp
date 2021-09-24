const router = require("express").Router();
const jobController = require("../../controllers/jobController");

// Matches with "/api/books"
router
  .route("/")
  .get(jobController.findAll)
  .post(jobController.create);

// Matches with "/api/books/:id"
router
  .route("/:id")
  .get(jobController.findById)
  .delete(jobController.remove);

module.exports = router;