const express = require("express");
const markerController = require("../controllers");

const router = express.Router();

router.get("/", markerController.wrongRoute);
router.get("/api/v1/markers", markerController.getallMarkers);
router.get("/api/v1/markers/:id", markerController.getMarker);
router.post("/api/v1/markers", markerController.createMarker);
router.delete("/api/v1/markers/:id", markerController.deleteMarker);
router.patch("/api/v1/markers/:id", markerController.updateMarker);

module.exports = router;
