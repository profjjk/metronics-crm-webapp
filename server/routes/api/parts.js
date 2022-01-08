const router = require("express").Router();
const partController = require("../../controllers/partController");
const authenticate = require('../../middleware/authenticate');

router.route("/")
    .get(authenticate.token, partController.findAll)
    .post(authenticate.token, partController.create)

router.route('/:id')
    .get(authenticate.token, partController.findById)
    .put(authenticate.token, partController.updateById)
    .delete(authenticate.token, partController.delete)

module.exports = router;
