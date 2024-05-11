const Subscription = require("../models/subscriptionModel")
const getSubscriptions = async (req,res) => {
    try {
     const subscriptions = await Subscription.find();
     if(!subscriptions){
      res.status(200).json({
        status: "success",
        message: "no subscription found"
      })
     }
     res.status(200).json({
      status: "success",
      data: subscriptions,
     })
      
    } catch (error) {
      res.status(400).json({
        status: "error",
        message: "Error bringing all subscriptions",
        error: error.message,
      });
    }
  }

  module.exports = {getSubscriptions}
  