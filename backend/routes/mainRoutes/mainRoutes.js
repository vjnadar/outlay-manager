const express = require("express");
const router = express.Router();

const mainController = require("../../controllers/mainController/mainController");
const mainRouteValidators = require("../../middlewares/validators/main/mainRouteValidators");
const authentication = require("../../middlewares/validators/authentication/authenticationValidator");

router.get(
  "/outlayData",
  mainRouteValidators.checkForParam,
  mainController.getAllData
);

router.get(
  "/getTotal",
  authentication.checkAuthentication,
  mainController.getTotal
);

router.post(
  "/postDateData",
  authentication.checkAuthentication,
  mainRouteValidators.postDateDataValidator,
  mainController.postDateData
);

router.put(
  "/updateEntry",
  authentication.checkAuthentication,
  mainRouteValidators.updateEntryValidator,
  mainController.updateEntry
);

router.get(
  "/getDateData/:date",
  authentication.checkAuthentication,
  mainRouteValidators.checkForParam,
  mainController.getDateData
);

router.delete(
  "/deleteEntry/:id",
  authentication.checkAuthentication,
  mainRouteValidators.checkForParam,
  mainController.deleteEntry
);

module.exports = router;
