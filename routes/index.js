const express = require("express");
const router = express.Router();
const { index, processData,visita, olvidar } = require("../controllers/controllerIndex");
const validatorData = require("../validator/validatorData");
const cookieCheck = require("../middlewares/cookieCheck");

/* GET home page. */
router.get("/", cookieCheck, index);
router.post("/", validatorData, processData);

router.get("/visita", visita);

router.get("/olvidar", olvidar);

module.exports = router;
