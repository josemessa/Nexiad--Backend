const router = require("express").Router();
const { login, getUsers, getMyUser} = require("../controllers/userController");
const { verifyToken } = require("../middlewares/auth");


router.post("/login", login);
router.get("/getusers", verifyToken, getUsers);
router.get("/getmyuser", verifyToken, getMyUser);


module.exports = router;