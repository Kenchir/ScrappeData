const express = require("express"),
  router = express.Router(),
  { lookupNetworkAndCountry, lookupNetworks } = require("../controllers/LookupFile");

router.get("/lookup_network_country", lookupNetworkAndCountry);
router.get("/lookup_allnetwork", lookupNetworks);
module.exports = router;
