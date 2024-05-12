const router = require("express").Router();
const {getSubscriptions, addSubscription} = require("../controllers/subscriptionController")

router.get("/getsubscriptions", getSubscriptions);
router.post("/addsubscription", addSubscription)

module.exports = router