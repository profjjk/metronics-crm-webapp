const router = require("express").Router();
const customerController = require("../../controllers/customerController");

// Matches with "/api/books"
router
  .route("/")
  .get(customerController.findAll)
  .post(customerController.create);

// Matches with "/api/books/:id"
router
  .route("/:id")
  .get(customerController.findById)
  .delete(customerController.remove);

module.exports = router;