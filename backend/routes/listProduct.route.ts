import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

interface ProductRequestBody {
  cropName: string;
  category: string;
  variety?: string;
  pricePerUnit: number | string;
  totalQuantity: number | string;
  userId?: string;
}

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

    // Get user ID from request (assuming authentication middleware sets this)
    // In a real app, you'd get this from JWT token or session
    const userId = req.body.userId || "default-user-id";

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
      },
    });

    return res.status(201).json({
      success: true,
      data: newCrop,
    });
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
    });

    return res.status(200).json({
      success: true,
      data: crops,
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

module.exports = router;
