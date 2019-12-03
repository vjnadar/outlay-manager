const express = require("express");
const router = express.Router();

const statsController = require("../../controllers/statsController/statsController");
const authentication = require("../../middlewares/validators/authentication/authenticationValidator");
const statsRouteValidator = require("../../middlewares/validators/stats/statsRouteValidator");

router.put(
  "/getStats",
  authentication.checkAuthentication,
  statsRouteValidator.getStatsValidator,
  statsController.getStats
);

module.exports = router;
