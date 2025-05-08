const Crop = require("../models/Crop");
const asyncHandler = require("express-async-handler");

// @desc    Get all crops
// @route   GET /api/crops
// @access  Public
exports.getCrops = async (req, res) => {
  try {
    const crops = await Crop.find();
    res.status(200).json({
      success: true,
      count: crops.length,
      data: crops,
    });
  } catch (error) {
    console.error("Error fetching crops:", error);
    res.status(500).json({
      success: false,
      message: "Failed to get crops",
      error: error.message,
    });
  }
};

// @desc    Create crop
// @route   POST /api/crops
// @access  Private
exports.createCrop = asyncHandler(async (req, res) => {
  console.log("Create crop request body:", req.body);

  const { cropName, category, variety, pricePerUnit, totalQuantity, userId } =
    req.body;

  // Validate required fields
  const missingFields = {
    cropName: !cropName,
    category: !category,
    variety: !variety,
    pricePerUnit: !pricePerUnit,
    totalQuantity: !totalQuantity,
    userId: !userId,
  };

  if (Object.values(missingFields).some(Boolean)) {
    console.log("Missing fields:", missingFields);
    return res.status(400).json({
      success: false,
      message: "Please provide all required fields",
      missingFields,
    });
  }

  try {
    // Ensure numeric fields are numbers
    const numericPricePerUnit = Number(pricePerUnit);
    const numericTotalQuantity = Number(totalQuantity);

    // Create the crop
    const crop = new Crop({
      cropName,
      category,
      variety,
      pricePerUnit: numericPricePerUnit,
      totalQuantity: numericTotalQuantity,
      userId,
      location: "Jaipur, Rajasthan",
      status: "active",
    });

    // Set image based on product data
    await crop.getImageFromProduceData();

    // Save the crop with the updated image
    await crop.save();

    console.log("Created crop:", crop);

    res.status(201).json({
      success: true,
      data: crop,
    });
  } catch (error) {
    console.error("Error creating crop:", error);

    // Handle validation errors
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((val) => val.message);
      console.log("Validation error messages:", messages);

      return res.status(400).json({
        success: false,
        message: "Validation failed",
        details: messages,
      });
    }

    res.status(500).json({
      success: false,
      message: error.message || "Server Error",
      error: process.env.NODE_ENV === "development" ? error.stack : undefined,
    });
  }
});

// @desc    Update crop
// @route   PUT /api/crops/:id
// @access  Private
exports.updateCrop = async (req, res) => {
  try {
    const { cropName, category, variety, pricePerUnit, totalQuantity, userId } =
      req.body;

    const crop = await Crop.findById(req.params.id);

    if (!crop) {
      return res.status(404).json({
        success: false,
        message: "Crop not found",
      });
    }

    // Check if user ID matches the crop's user ID for authorization
    if (userId && userId !== crop.userId) {
      console.log(`User ID mismatch: ${userId} vs ${crop.userId}`);
      return res.status(403).json({
        success: false,
        message: "Not authorized to update this crop",
      });
    }

    // Update crop fields
    crop.cropName = req.body.cropName || crop.cropName;
    crop.category = req.body.category || crop.category;
    crop.variety = req.body.variety || crop.variety;
    crop.pricePerUnit = Number(req.body.pricePerUnit) || crop.pricePerUnit;
    crop.totalQuantity = Number(req.body.totalQuantity) || crop.totalQuantity;
    crop.location = "Jaipur, Rajasthan";

    // If category or crop name changed, update the image
    if (crop.cropName || crop.category) {
      await crop.getImageFromProduceData();
    }

    const updatedCrop = await crop.save();

    res.status(200).json({
      success: true,
      data: updatedCrop.toJSON(),
    });
  } catch (error) {
    console.error("Error updating crop:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update crop",
      error: error.message,
    });
  }
};

// @desc    Delete crop
// @route   DELETE /api/crops/:id
// @access  Private
exports.deleteCrop = async (req, res) => {
  try {
    console.log(`Delete request for crop ID: ${req.params.id}`);

    const crop = await Crop.findById(req.params.id);

    if (!crop) {
      console.log(`Crop with ID ${req.params.id} not found`);
      return res.status(404).json({
        success: false,
        message: "Crop not found",
      });
    }

    console.log("Crop found:", {
      id: crop._id,
      name: crop.cropName,
    });

    console.log("Deleting crop...");
    const deleteResult = await Crop.deleteOne({ _id: req.params.id });
    console.log("Delete result:", deleteResult);

    if (deleteResult.deletedCount === 1) {
      console.log(`Crop ${req.params.id} deleted successfully`);
      return res.status(200).json({
        success: true,
        message: "Crop deleted successfully",
      });
    } else {
      console.log(`Failed to delete crop ${req.params.id}`);
      return res.status(500).json({
        success: false,
        message: "Failed to delete crop",
      });
    }
  } catch (error) {
    console.error("Error deleting crop:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to delete crop",
      error: error.message,
    });
  }
};
