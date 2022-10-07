const express = require("express");
const router = express.Router();
const customerController = require("../controllers/customer")

router.get("", async (req, res) => {
    return await customerController.findCustomers(req, res);
})

router.get("/:id", async (req, res) => {
    return await customerController.findCustomer(req, res);
})

router.post("", async (req, res) => {
    return await customerController.createCustomer(req, res);
})

router.patch("/:id", async (req, res) => {
    return await customerController.updateCustomer(req, res);
})

router.delete("/:id", async (req, res) => {
    return await customerController.deleteCustomer(req, res);
})

module.exports = router;