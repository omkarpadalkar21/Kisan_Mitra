const express = require("express");
const { PrismaClient } = require("@prisma/client");
const vegetableData = require("../data/vegetableData");

const router = express.Router();
const prisma = new PrismaClient();

// Create a new product listing
router.post("/", async (req, res) => {
  try {
    const { cropName, category, variety, pricePerUnit, totalQuantity } =
      req.body;

    // Validate required fields
    if (!cropName || !category || !pricePerUnit || !totalQuantity) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    try {
      // First try to create a dummy user if needed
      const existingUser = await prisma.user.findFirst();
      let userId = existingUser?.id;

      if (!userId) {
        // Create a dummy user
        const newUser = await prisma.user.create({
          data: {
            name: "Dummy User",
            email: "dummy@example.com",
            password: "password123",
          },
        });
        userId = newUser.id;
      }

      // Find the vegetable image from our data
      console.log("Looking for crop:", cropName);
      console.log(
        "Available vegetables:",
        vegetableData.vegetables.map((v) => v.name)
      );

      // Extract base vegetable name by removing common prefixes and suffixes
      const baseName = cropName
        .toLowerCase()
        .trim()
        .replace(
          /^(fresh|organic|green|red|yellow|white|black|purple|baby)\s+/,
          ""
        ) // Remove common prefixes
        .replace(/\s+\([^)]*\)$/, "") // Remove anything in parentheses at the end
        .replace(/\s+available$/, "") // Remove "available" suffix
        .replace(/\s+kg$/, "") // Remove "kg" suffix
        .replace(/\s+piece$/, "") // Remove "piece" suffix
        .replace(/\s+bundle$/, "") // Remove "bundle" suffix
        .trim();

      console.log("Base vegetable name:", baseName);

      const vegetable = vegetableData.vegetables.find((v) => {
        const match = v.name.toLowerCase().trim() === baseName;
        console.log(`Comparing "${v.name}" with "${baseName}": ${match}`);
        return match;
      });

      console.log("Found vegetable:", vegetable);
      const imageUrl = vegetable
        ? vegetable.image
        : "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&q=80&w=150";
      console.log("Using image URL:", imageUrl);

      // Create new crop record
      const newCrop = await prisma.crop.create({
        data: {
          cropName,
          category,
          variety: variety || "",
          pricePerUnit: parseFloat(String(pricePerUnit)),
          totalQuantity: parseInt(String(totalQuantity)),
          userId,
          status: "active",
          image: imageUrl,
        },
      });

      return res.status(201).json({
        success: true,
        data: newCrop,
      });
    } catch (error) {
      console.error("Error in database operations:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to create product",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  } catch (error) {
    console.error("Error creating product:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to create product",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

// Get all products
router.get("/", async (_req, res) => {
  try {
    const crops = await prisma.crop.findMany({
      where: {
        status: "active",
      },
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // Format the response data
    const formattedCrops = crops.map((crop) => ({
      id: crop.id,
      name: crop.cropName,
      price: `₹${crop.pricePerUnit}/kg`,
      quantity: `${crop.totalQuantity} kg available`,
      seller: crop.user.name,
      location: "Jaipur, Rajasthan", // This would come from user profile in a real app
      image:
        crop.image ||
        "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&q=80&w=150",
      variety: crop.variety,
      category: crop.category,
    }));

    return res.status(200).json({
      success: true,
      data: formattedCrops,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch products",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

// Update a product
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { cropName, category, variety, pricePerUnit, totalQuantity } =
      req.body;

    // Validate required fields
    if (!cropName || !category || !pricePerUnit || !totalQuantity) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    // Find the vegetable image from our data
    const baseName = cropName
      .toLowerCase()
      .trim()
      .replace(
        /^(fresh|organic|green|red|yellow|white|black|purple|baby)\s+/,
        ""
      )
      .replace(/\s+\([^)]*\)$/, "")
      .replace(/\s+available$/, "")
      .replace(/\s+kg$/, "")
      .replace(/\s+piece$/, "")
      .replace(/\s+bundle$/, "")
      .trim();

    const vegetable = vegetableData.vegetables.find(
      (v) => v.name.toLowerCase().trim() === baseName
    );
    const imageUrl = vegetable
      ? vegetable.image
      : "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&q=80&w=150";

    // Update the crop record
    const updatedCrop = await prisma.crop.update({
      where: { id },
      data: {
        cropName,
        category,
        variety: variety || "",
        pricePerUnit: parseFloat(String(pricePerUnit)),
        totalQuantity: parseInt(String(totalQuantity)),
        image: imageUrl,
      },
    });

    return res.status(200).json({
      success: true,
      data: updatedCrop,
    });
  } catch (error) {
    console.error("Error updating product:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update product",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

// Delete a product (soft delete by setting status to inactive)
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deletedCrop = await prisma.crop.update({
      where: { id },
      data: {
        status: "inactive",
      },
    });

    return res.status(200).json({
      success: true,
      data: deletedCrop,
    });
  } catch (error) {
    console.error("Error deleting product:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to delete product",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

module.exports = router;
