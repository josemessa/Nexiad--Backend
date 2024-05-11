const router = require("express").Router();
const {getSubscriptions} = require("../controllers/subscriptionController")

router.get("/getsubscriptions", getSubscriptions);

module.exports = router