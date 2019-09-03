const db = require("../../data");

let memoryData = [...db];

class MarkerController {
 
  wrongRoute(req, res) {
    res.status(404).send({
      message: "Not Found"
    });
  }

  
  getallMarkers(req, res) {
    res.status(200).send({
      success: "true",
      data: memoryData
    });
  }

  
  getMarker(req, res) {
    const id = parseInt(req.params.id, 10);

    const value = memoryData.filter(marker => marker.id === id);

    if (value && value.length > 0) {
      res.status(200).send({
        data: value
      });
    } else {
      res.status(404).send({
        success: "fail",
        message: "Marker does not exist"
      });
    }
  }

  
  createMarker(req, res) {
    const marker = {
      id: memoryData.length + 1,
      title: req.body.title,
      lat: parseInt(req.body.lat, 10),
      lng: parseInt(req.body.lng, 10)
    };

    memoryData = [...memoryData, marker];

    res.status(201).send({
      success: "true",
      message: "Marker added succesfully",
      marker
    });
  }

  
  deleteMarker(req, res) {
    const id = parseInt(req.params.id, 10);

    memoryData = memoryData.filter(marker => marker.id !== id);

    res.status(200).send({
      success: "true",
      message: "Marker deleted successfully"
    });
  }

  
  updateMarker(req, res) {
    const id = parseInt(req.params.id, 10);
    let markerData = {};
    let markerIdx;

    memoryData.map((marker, idx) => {
      if (marker.id === id) {
        markerData = marker;
        markerIdx = idx;
      }
    });

    const updateMarker = {
      id: markerData.id,
      title: req.body.title || markerData.title,
      lat: parseInt(req.body.lat, 10) || markerData.lat,
      lng: parseInt(req.body.lng, 10) || markerData.lng
    };

    memoryData.splice(markerIdx, 1, updateMarker);

    res.status(201).send({
      succes: "true",
      message: "Marker updated successfully",
      updateMarker
    });
  }
}

const MarkController = new MarkerController();

module.exports = MarkController;
