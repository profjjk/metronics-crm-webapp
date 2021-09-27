const router = require("express").Router();
const partController = require("../../controllers/partController");

router.route("/")
    .get(partController.findAll);

router.route('/:id')
    .get(partController.findById)

module.exports = router;