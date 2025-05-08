const express = require("express");
const router = express.Router();
const {
  getCrops,
  createCrop,
  updateCrop,
  deleteCrop,
} = require("../controllers/cropController");

// Get all crops
router.get("/", getCrops);

// Create new crop
router.post("/", createCrop);

// Update crop
router.put("/:id", updateCrop);

// Delete crop
router.delete("/:id", deleteCrop);

module.exports = router;
