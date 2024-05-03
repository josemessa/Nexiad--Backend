const router = require("express").Router();
const { login, getUsers , addUser} = require("../controllers/userController");
const { verifyToken } = require("../middlewares/auth");


router.post("/login", login);
router.get("/getusers", verifyToken, getUsers);
router.post("/", verifyToken, addUser )




module.exports = router;