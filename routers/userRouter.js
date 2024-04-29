const router = require("express").Router();
const { login, getUsers } = require("../controllers/userController");
const { verifyToken } = require("../middlewares/auth");


router.post("/login", login);
router.get("/getusers", verifyToken, getUsers);




module.exports = router;