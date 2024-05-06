const router = require("express").Router();
const { login, getUsers , addUser, getMyUser, getUserById, deleteUser} = require("../controllers/userController");

const { verifyToken } = require("../middlewares/auth");


router.post("/login", login);
router.get("/getusers", verifyToken, getUsers);
router.get("/getmyuser", verifyToken, getMyUser);
router.post("/", verifyToken, addUser )
router.delete("/:id", verifyToken, deleteUser)
router.get("/:id", getUserById);




module.exports = router;