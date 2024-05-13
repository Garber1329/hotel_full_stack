const express = require('express');
const router = express.Router();

const Service = require('../models/service');

router.get("/getallservices", async(req, res) => {

    try {
        const services = await Service.find({})
        res.json(services);
    } catch (error) {
        return res.status (400).json({ message: error });
    }

});

router.post("/getservicebyid", async(req, res) => {

    const serviceid = req.body.roomid;

    try {
        const service = await Service.findOne({_id: serviceid});
        res.json(service);
    } catch (error) {
        return res.status (400).json({ message: error });
    }

});

router.post("/addservice", async (req, res) => {
    try {
        const newservice = new Service(req.body)
        await newservice.save()

        res.send('New Service Added Successfully');
    } catch (error) {
        return res.status(400).json({ error });
    }
})

module.exports = router;