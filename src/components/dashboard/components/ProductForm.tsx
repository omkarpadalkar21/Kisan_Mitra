import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProductFormValues, formSchema } from "../types/marketplace";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

// Define types for produce data
type CropData = {
  name: string;
  image: string;
};

type CategoryData = {
  [key: string]: CropData;
};

type ProduceData = {
  [key: string]: CategoryData;
};

// Import the produce data directly (mock data until we can properly import from backend)
const produceData: ProduceData = {
  Vegetables: {
    Potato: {
      name: "Potato",
      image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655",
    },
    Tomato: {
      name: "Tomato",
      image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea",
    },
    Onion: {
      name: "Onion",
      image:
        "https://plus.unsplash.com/premium_photo-1668076517573-fa01307d87ad",
    },
    Carrot: {
      name: "Carrot",
      image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37",
    },
    Cabbage: {
      name: "Cabbage",
      image: "https://images.unsplash.com/photo-1594282486552-05b4d80fbb9f",
    },
    Cauliflower: {
      name: "Cauliflower",
      image: "https://images.unsplash.com/photo-1568584711075-3d021a7c3ca3",
    },
    Spinach: {
      name: "Spinach",
      image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb",
    },
    Lettuce: {
      name: "Lettuce",
      image: "https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1",
    },
    Broccoli: {
      name: "Broccoli",
      image:
        "https://plus.unsplash.com/premium_photo-1702403157830-9df749dc6c1e",
    },
    BellPepper: {
      name: "Bell Pepper",
      image: "https://images.unsplash.com/photo-1506365069540-904bcc762636",
    },
    ChiliPepper: {
      name: "Chili Pepper",
      image: "https://images.unsplash.com/photo-1526346698789-22fd84314424",
    },
    Eggplant: {
      name: "Eggplant",
      image: "https://images.unsplash.com/photo-1604321272882-07c73743be32",
    },
    Cucumber: {
      name: "Cucumber",
      image: "https://images.unsplash.com/photo-1449300079323-02e209d9d3a6",
    },
    Radish: {
      name: "Radish",
      image: "https://images.unsplash.com/photo-1585369496178-144fd937f249",
    },
    Beetroot: {
      name: "Beetroot",
      image:
        "https://plus.unsplash.com/premium_photo-1667052361276-da58019efe02",
    },
    Pumpkin: {
      name: "Pumpkin",
      image: "https://images.unsplash.com/photo-1570586437263-ab629fccc818",
    },
    Zucchini: {
      name: "Zucchini",
      image: "https://images.unsplash.com/photo-1583687355032-89b902b7335f",
    },
    BitterGourd: {
      name: "Bitter Gourd",
      image: "https://images.unsplash.com/photo-1588391453522-a8b470845269",
    },
    BottleGourd: {
      name: "Bottle Gourd",
      image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37",
    },
    Okra: {
      name: "Okra",
      image: "https://images.unsplash.com/photo-1664289242854-e99d345cfa92",
    },
    GreenBeans: {
      name: "Green Beans",
      image: "https://images.unsplash.com/photo-1642864337829-0aa013da1223",
    },
    Peas: {
      name: "Peas",
      image: "https://images.unsplash.com/photo-1642864337829-0aa013da1223",
    },
    SweetCorn: {
      name: "Sweet Corn",
      image: "https://images.unsplash.com/photo-1551754655-cd27e38d2076",
    },
    Garlic: {
      name: "Garlic",
      image: "https://images.unsplash.com/photo-1540148426945-6cf22a6b2383",
    },
    Ginger: {
      name: "Ginger",
      image: "https://images.unsplash.com/photo-1615484477778-ca3b77940c25",
    },
    Fenugreek: {
      name: "Fenugreek",
      image: "https://images.unsplash.com/photo-1594284766584-74d5af626e3f",
    },
    Drumstick: {
      name: "Drumstick",
      image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37",
    },
    AshGourd: {
      name: "Ash Gourd",
      image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37",
    },
    BrusselsSprouts: {
      name: "Brussels Sprouts",
      image: "https://images.unsplash.com/photo-1599252962575-f57431378cfe",
    },
    Turnip: {
      name: "Turnip",
      image: "https://images.unsplash.com/photo-1594282486552-05b4d80fbb9f",
    },
  },
  Fruits: {
    Apple: {
      name: "Apple",
      image: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce",
    },
    Banana: {
      name: "Banana",
      image: "https://images.unsplash.com/photo-1574226516831-e1dff420e8f8",
    },
    Orange: {
      name: "Orange",
      image: "https://images.unsplash.com/photo-1557800636-894a64c1696f",
    },
    Mango: {
      name: "Mango",
      image: "https://images.unsplash.com/photo-1516684669134-de6f85efb0c6",
    },
    Grapes: {
      name: "Grapes",
      image: "https://images.unsplash.com/photo-1514996937319-344454492b37",
    },
    Pineapple: {
      name: "Pineapple",
      image: "https://images.unsplash.com/photo-1550828520-4cb496926fc9",
    },
    Strawberry: {
      name: "Strawberry",
      image: "https://images.unsplash.com/photo-1518635017480-d9a4666b5a13",
    },
    Blueberry: {
      name: "Blueberry",
      image: "https://images.unsplash.com/photo-1498557850523-fd3d118b962e",
    },
    Watermelon: {
      name: "Watermelon",
      image: "https://images.unsplash.com/photo-1563114773-84221bd62daa",
    },
    Papaya: {
      name: "Papaya",
      image: "https://images.unsplash.com/photo-1526546334624-2bfb73226555",
    },
    Kiwi: {
      name: "Kiwi",
      image: "https://images.unsplash.com/photo-1618897996318-5a901fa6ca71",
    },
    Peach: {
      name: "Peach",
      image: "https://images.unsplash.com/photo-1595743825637-cdafc8ad4173",
    },
    Plum: {
      name: "Plum",
      image: "https://images.unsplash.com/photo-1597256121615-ea6c52f13cfb",
    },
    Cherry: {
      name: "Cherry",
      image: "https://images.unsplash.com/photo-1611096265583-5d745a5f3b26",
    },
    Apricot: {
      name: "Apricot",
      image: "https://images.unsplash.com/photo-1599414255658-e72545eb29e5",
    },
    Pomegranate: {
      name: "Pomegranate",
      image: "https://images.unsplash.com/photo-1620200458072-7070fd503076",
    },
    Guava: {
      name: "Guava",
      image: "https://images.unsplash.com/photo-1536511132770-e5058c7e8c46",
    },
    Lychee: {
      name: "Lychee",
      image: "https://images.unsplash.com/photo-1629442039963-67c2b0b12eb5",
    },
    Fig: {
      name: "Fig",
      image: "https://images.unsplash.com/photo-1597306691225-69ef217a43be",
    },
  },
  Grains: {
    Rice: {
      name: "Rice",
      image: "https://images.unsplash.com/photo-1550617931-e17a7b70dce2",
    },
    Wheat: {
      name: "Wheat",
      image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6962fb",
    },
    Barley: {
      name: "Barley",
      image: "https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6",
    },
    Oats: {
      name: "Oats",
      image: "https://images.unsplash.com/photo-1614961233913-a5113a4df2b1",
    },
    Corn: {
      name: "Corn",
      image: "https://images.unsplash.com/photo-1551754655-cd27e38d2076",
    },
    Millet: {
      name: "Millet",
      image: "https://images.unsplash.com/photo-1600692978168-836954103c5c",
    },
    Quinoa: {
      name: "Quinoa",
      image: "https://images.unsplash.com/photo-1612358405970-e1fda10c4d27",
    },
    Sorghum: {
      name: "Sorghum",
      image: "https://images.unsplash.com/photo-1562833755-a2250a488165",
    },
    Rye: {
      name: "Rye",
      image: "https://images.unsplash.com/photo-1631898039260-80ab68771114",
    },
    Buckwheat: {
      name: "Buckwheat",
      image: "https://images.unsplash.com/photo-1575527936836-508884a8df0d",
    },
  },
  Pulses: {
    Lentils: {
      name: "Lentils",
      image: "https://images.unsplash.com/photo-1615485500704-8e990f9511be",
    },
    Chickpeas: {
      name: "Chickpeas",
      image: "https://images.unsplash.com/photo-1593252723114-b54749a5073e",
    },
    Peas: {
      name: "Peas",
      image: "https://images.unsplash.com/photo-1603431777007-bdb7e027f8e9",
    },
    Beans: {
      name: "Beans",
      image: "https://images.unsplash.com/photo-1551300739-125a008c9e25",
    },
    Soybeans: {
      name: "Soybeans",
      image: "https://images.unsplash.com/photo-1646861371518-fe5b9d672a8c",
    },
    BlackEyedPeas: {
      name: "Black Eyed Peas",
      image: "https://images.unsplash.com/photo-1615485500704-8e990f9511be",
    },
    KidneyBeans: {
      name: "Kidney Beans",
      image: "https://images.unsplash.com/photo-1563635707456-2220cfdac68f",
    },
    PintoBeans: {
      name: "Pinto Beans",
      image: "https://images.unsplash.com/photo-1668029475244-b8a4e1c40004",
    },
    NavyBeans: {
      name: "Navy Beans",
      image: "https://images.unsplash.com/photo-1615485500704-8e990f9511be",
    },
    LimaBeans: {
      name: "Lima Beans",
      image: "https://images.unsplash.com/photo-1615485500704-8e990f9511be",
    },
  },
  Spices: {
    Turmeric: {
      name: "Turmeric",
      image: "https://images.unsplash.com/photo-1615485291234-9d694218aeb3",
    },
    Cumin: {
      name: "Cumin",
      image: "https://images.unsplash.com/photo-1587132137056-bfbf0166836e",
    },
    Coriander: {
      name: "Coriander",
      image: "https://images.unsplash.com/photo-1648170722516-9a765e601dd2",
    },
    Cardamom: {
      name: "Cardamom",
      image: "https://images.unsplash.com/photo-1593892672162-58a5214d8944",
    },
    Cloves: {
      name: "Cloves",
      image: "https://images.unsplash.com/photo-1600714878724-ccc2f0ece46c",
    },
    Cinnamon: {
      name: "Cinnamon",
      image: "https://images.unsplash.com/photo-1587131782738-de30ea91a542",
    },
    Nutmeg: {
      name: "Nutmeg",
      image: "https://images.unsplash.com/photo-1590154218898-25c5f926aadf",
    },
    Saffron: {
      name: "Saffron",
      image: "https://images.unsplash.com/photo-1636928284262-6fab07ba5a84",
    },
    MustardSeeds: {
      name: "Mustard Seeds",
      image: "https://images.unsplash.com/photo-1590301249293-a4a15372bfd7",
    },
    FenugreekSeeds: {
      name: "Fenugreek Seeds",
      image: "https://images.unsplash.com/photo-1594284766584-74d5af626e3f",
    },
  },
};

interface ProductFormProps {
  onSubmit: (values: ProductFormValues) => void;
  isLoading: boolean;
  defaultValues?: ProductFormValues;
  submitButtonText?: string;
  onCancel?: () => void;
}

const ProductForm: React.FC<ProductFormProps> = ({
  onSubmit,
  isLoading,
  defaultValues,
  submitButtonText = "Submit",
  onCancel,
}) => {
  const [availableCrops, setAvailableCrops] = useState<string[]>([]);

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues || {
      cropName: "",
      category: "",
      variety: "",
      pricePerUnit: 0,
      totalQuantity: 0,
    },
  });

  // Update available crops when category changes
  const category = form.watch("category");

  useEffect(() => {
    if (category && produceData[category]) {
      // Debug logs
      console.log(`Selected category: ${category}`);
      console.log("Category data:", produceData[category]);

      // Extract crop names from the category data
      const crops = Object.entries(produceData[category]).map(
        ([key, cropData]) => cropData.name
      );

      console.log("Available crops:", crops);
      setAvailableCrops(crops);
    } else {
      setAvailableCrops([]);
    }
  }, [category]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select
                onValueChange={(value) => {
                  field.onChange(value);
                  // Reset cropName when category changes
                  form.setValue("cropName", "");
                }}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.keys(produceData).map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {category && (
          <FormField
            control={form.control}
            name="cropName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Crop Name</FormLabel>
                <Select
                  onValueChange={(value) => {
                    console.log(`Selected crop: ${value}`);
                    field.onChange(value);
                  }}
                  value={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select crop" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="max-h-[300px] overflow-y-auto">
                    {availableCrops.length > 0 ? (
                      availableCrops.map((crop) => (
                        <SelectItem key={crop} value={crop}>
                          {crop}
                        </SelectItem>
                      ))
                    ) : (
                      <SelectItem value="" disabled>
                        No crops available for this category
                      </SelectItem>
                    )}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <FormField
          control={form.control}
          name="variety"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Variety</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select variety" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="organic">Organic</SelectItem>
                  <SelectItem value="local">Local</SelectItem>
                  <SelectItem value="hybrid">Hybrid</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="pricePerUnit"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price Per Unit (₹)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Enter price per unit"
                  {...field}
                  onChange={(e) => {
                    const value = parseFloat(e.target.value);
                    field.onChange(isNaN(value) ? 0 : value);
                  }}
                  min="0"
                  step="0.01"
                  className="w-full"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="totalQuantity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Total Quantity (kg)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Enter total quantity"
                  {...field}
                  onChange={(e) => {
                    const value = parseInt(e.target.value);
                    field.onChange(isNaN(value) ? 0 : value);
                  }}
                  min="1"
                  className="w-full"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end space-x-2 mt-6">
          {onCancel && (
            <Button
              variant="outline"
              type="button"
              onClick={onCancel}
              disabled={isLoading}
              className="transition-all duration-200 hover:bg-gray-100"
            >
              Cancel
            </Button>
          )}
          <motion.div
            whileTap={{ scale: 0.97 }}
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.2 }}
          >
            <Button
              type="submit"
              className="bg-emerald-600 hover:bg-emerald-700 text-white transition-colors duration-300"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center">
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Processing...
                </div>
              ) : (
                submitButtonText
              )}
            </Button>
          </motion.div>
        </div>
      </form>
    </Form>
  );
};

export default ProductForm;
