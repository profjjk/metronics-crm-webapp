const router = require("express").Router();
const partController = require("../../controllers/partController");

// Matches with "/api/books"
router
  .route("/")
  .get(partController.findAll)
  .post(partController.create);

// Matches with "/api/books/:id"
router
  .route("/:id")
  .get(partController.findById)
  .delete(partController.remove);

module.exports = router;