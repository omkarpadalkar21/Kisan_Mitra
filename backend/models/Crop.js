const mongoose = require("mongoose");

const cropSchema = new mongoose.Schema(
  {
    cropName: {
      type: String,
      required: [true, "Crop name is required"],
      trim: true,
      minlength: [2, "Crop name must be at least 2 characters long"],
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      trim: true,
    },
    variety: {
      type: String,
      default: "",
      trim: true,
    },
    pricePerUnit: {
      type: Number,
      required: [true, "Price per unit is required"],
      min: [0, "Price cannot be negative"],
      validate: {
        validator: function (v) {
          return !isNaN(v) && v >= 0;
        },
        message: (props) => `${props.value} is not a valid price!`,
      },
    },
    totalQuantity: {
      type: Number,
      required: [true, "Total quantity is required"],
      min: [0, "Quantity cannot be negative"],
      validate: {
        validator: function (v) {
          return !isNaN(v) && v >= 0;
        },
        message: (props) => `${props.value} is not a valid quantity!`,
      },
    },
    status: {
      type: String,
      enum: ["active", "inactive", "sold", "available"],
      default: "active",
    },
    image: {
      type: String,
      default:
        "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&q=80&w=150",
    },
    userId: {
      type: String,
      required: [true, "User ID is required"],
      trim: true,
    },
    location: {
      type: String,
      default: "Jaipur, Rajasthan",
      trim: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (doc, ret) {
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

// Add a method to get image URL from produceData
cropSchema.methods.getImageFromProduceData = async function () {
  try {
    const produceData = require("../data/vegetableData");

    // Check if category exists
    if (produceData[this.category]) {
      // Find the crop in the category by name
      const cropKey = Object.keys(produceData[this.category]).find(
        (key) =>
          produceData[this.category][key].name.toLowerCase() ===
          this.cropName.toLowerCase()
      );

      if (cropKey && produceData[this.category][cropKey].image) {
        this.image = produceData[this.category][cropKey].image;
        console.log(
          `Found image for ${this.cropName} in ${this.category}: ${this.image}`
        );
      } else {
        console.log(
          `No matching image found for ${this.cropName} in ${this.category}`
        );
      }
    } else {
      console.log(`Category ${this.category} not found in produceData`);
    }
  } catch (error) {
    console.error("Error loading produce data:", error);
  }

  return this.image;
};

// Add indexes for better query performance
cropSchema.index({ userId: 1 });
cropSchema.index({ status: 1 });
cropSchema.index({ createdAt: -1 });

// Add pre-save middleware to validate data
cropSchema.pre("save", function (next) {
  // Ensure price and quantity are numbers
  if (typeof this.pricePerUnit === "string") {
    this.pricePerUnit = Number(this.pricePerUnit);
  }
  if (typeof this.totalQuantity === "string") {
    this.totalQuantity = Number(this.totalQuantity);
  }
  next();
});

const Crop = mongoose.model("Crop", cropSchema);

module.exports = Crop;
