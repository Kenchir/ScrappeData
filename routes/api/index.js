const express = require("express"),
  router = express.Router();

router.use("/mcc-mnc", require("./mcc"));

module.exports = router;
