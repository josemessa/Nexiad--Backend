const router = require("express").Router();
const { login, getUsers , addUser, getMyUser, getUserById } = require("../controllers/userController");
const { verifyToken } = require("../middlewares/auth");


router.post("/login", login);
router.get("/getusers", verifyToken, getUsers);
router.get("/getmyuser", verifyToken, getMyUser);
router.get("/:id/getuserbyid", getUserById);
router.post("/", verifyToken, addUser );




module.exports = router;