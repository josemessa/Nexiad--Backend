const router = require("express").Router();
const { login, getUsers , addUser, getMyUser, disableAccess , disableAdminAccess} = require("../controllers/userController");
const { verifyToken } = require("../middlewares/auth");


router.post("/login", login);
router.get("/getusers", verifyToken, getUsers);
router.get("/getmyuser", verifyToken, getMyUser);
router.post("/", verifyToken, addUser );
router.patch("/:id/disableadmin", disableAdminAccess);
router.patch("/:id/disableaccess", disableAccess);




module.exports = router;