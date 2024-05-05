const router = require("express").Router();
const { login, getUsers , addUser, getMyUser, disableAccess , getUserById, disableAdminAccess} = require("../controllers/userController");
const { verifyToken } = require("../middlewares/auth");


router.post("/login", login);
router.get("/getusers", verifyToken, getUsers);
router.get("/getmyuser", verifyToken, getMyUser);
router.post("/", verifyToken, addUser );
router.patch("/:id/disableadmin", disableAdminAccess);
router.patch("/:id/disableaccess", disableAccess);
router.get("/:id/getuserbyid", getUserById);
router.post("/", verifyToken, addUser );




module.exports = router;