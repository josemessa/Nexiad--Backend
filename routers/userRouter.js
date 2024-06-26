const router = require("express").Router();
const {
  login,
  getUsers,
  addUser,
  addUserFromLogin,
  getMyUser,
  getUserById,
  deleteUser,
  disableAccess,
  disableAdminAccess,
  editUser,
} = require("../controllers/userController");

const { verifyToken } = require("../middlewares/auth");

router.post("/login", login);
router.get("/getusers", verifyToken, getUsers);
router.get("/getmyuser", verifyToken, getMyUser);
router.post("/signup", verifyToken, addUser);
router.post("/signupuser", addUserFromLogin);
router.delete("/:id", verifyToken, deleteUser);
router.get("/:id", getUserById);
router.patch("/:id/disableadmin", verifyToken, disableAdminAccess);
router.patch("/:id/disableaccess", verifyToken, disableAccess);
router.patch("/:id/edituser", verifyToken, editUser);

module.exports = router;
