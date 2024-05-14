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
router.patch("/:id/disableadmin", disableAdminAccess);
router.patch("/:id/disableaccess", disableAccess);
router.patch("/:id/edituser", editUser);

module.exports = router;
