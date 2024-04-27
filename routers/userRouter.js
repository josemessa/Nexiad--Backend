const router = require("express").Router();
const { login, getUsers } = require("../controllers/userController")


router.post("/login", login);
router.get("/getusers", getUsers);




module.exports = router;