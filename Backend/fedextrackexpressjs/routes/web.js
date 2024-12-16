const express = require('express');
const router = express.Router();
const FedexTrackingController = require('../controllers/fedexTrackingController.js');

router.get('/pk', async (req, res) => {
    res.send({
        a: 1,
        b: 2, 
        c: 3
    })
});

router.post("/track", FedexTrackingController.trackFedexShipment)

router.post("/addOrders", FedexTrackingController.addOrder)

module.exports = router;