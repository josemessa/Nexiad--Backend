const { authorizeAdmin } = require("../controllers/authorizationControllers");
const { verifyToken } = require("../middlewares/auth");

const router = require("express").Router();

router.post("/inviteadmin", verifyToken, authorizeAdmin);

module.exports = router;
