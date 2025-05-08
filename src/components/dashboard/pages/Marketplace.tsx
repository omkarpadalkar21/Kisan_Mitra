import React, { useState, useEffect } from "react";
import { FaShoppingCart, FaStore, FaLeaf, FaTruck } from "react-icons/fa";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Product, UIProduct, ProductFormValues } from "../types/marketplace";
import ProductCard from "../components/ProductCard";
import ProductForm from "../components/ProductForm";
import { Toaster, toast } from "sonner";
import { useUser } from "@clerk/clerk-react";
import { motion, AnimatePresence } from "framer-motion";

// Define some default category images
const categoryDefaultImages: Record<string, string> = {
  Vegetables:
    "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&q=80&w=150",
  Fruits:
    "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?auto=format&fit=crop&q=80&w=150",
  Grains:
    "https://images.unsplash.com/photo-1574323347407-f5e1ad6962fb?auto=format&fit=crop&q=80&w=150",
  Pulses:
    "https://images.unsplash.com/photo-1615485500704-8e990f9511be?auto=format&fit=crop&q=80&w=150",
  Spices:
    "https://images.unsplash.com/photo-1615485291234-9d694218aeb3?auto=format&fit=crop&q=80&w=150",
};

// Map API product to UI product format
const mapProductForUI = (product: Product): UIProduct => {
  // Format the variety value to capitalize first letter
  const formatVariety = (variety: string) => {
    if (!variety) return "";
    return variety.charAt(0).toUpperCase() + variety.slice(1);
  };

  // Get default image based on category
  const getCategoryDefaultImage = (category: string) => {
    return (
      categoryDefaultImages[category] ||
      "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&q=80&w=150"
    );
  };

  return {
    id: product.id,
    name: product.cropName,
    price: `₹${product.pricePerUnit}/kg`,
    quantity: `${product.totalQuantity} kg available`,
    seller: "Omkar Farms", // This would come from user data in a real app
    location: product.location || "Jaipur, Rajasthan", // Use location from product if available
    image: product.image || getCategoryDefaultImage(product.category),
    variety: formatVariety(product.variety),
    ownerId: product.userId, // Include the owner ID for authorization checks
  };
};

// Map UI product back to API product format for update
const mapUIProductToAPI = (uiProduct: UIProduct): Partial<Product> => {
  // Extract the price value without the currency and unit
  const priceString = uiProduct.price.replace(/[^0-9.]/g, "");

  // Extract the quantity value without the unit and availability text
  const quantityString = uiProduct.quantity.replace(/[^0-9.]/g, "");

  return {
    id: uiProduct.id,
    cropName: uiProduct.name,
    pricePerUnit: parseFloat(priceString),
    totalQuantity: parseInt(quantityString),
    variety: uiProduct.variety.toLowerCase(),
    location: uiProduct.location,
  };
};

const Marketplace = () => {
  const { user } = useUser();
  const [open, setOpen] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [apiProducts, setApiProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Convert API products to UI format
  const uiProducts: UIProduct[] = apiProducts.map(mapProductForUI);

  // Define fetchProducts function
  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/crops");
      const data = await response.json();

      if (data.success) {
        setApiProducts(data.data);
      } else {
        console.error("Failed to fetch products:", data.message);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch products on mount
  useEffect(() => {
    fetchProducts();
  }, []);

  const handleUpdate = (product: UIProduct) => {
    const originalProduct = apiProducts.find((p) => p.id === product.id);
    if (originalProduct) {
      setSelectedProduct(originalProduct);
      setUpdateOpen(true);
    }
  };

  const handleDelete = async (productId: string) => {
    try {
      setIsLoading(true);

      // Store the product for potential rollback
      const productToDelete = apiProducts.find((p) => p.id === productId);

      // Optimistically remove from UI
      setApiProducts((prevProducts) =>
        prevProducts.filter((p) => p.id !== productId)
      );

      const response = await fetch(
        `http://localhost:5000/api/crops/${productId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (data.success) {
        return true;
      } else {
        // Rollback on failure
        if (productToDelete) {
          setApiProducts((prev) => [...prev, productToDelete]);
        }

        return false;
      }
    } catch (error) {
      // Rollback on error
      const productToDelete = apiProducts.find((p) => p.id === productId);
      if (productToDelete) {
        setApiProducts((prev) => [...prev, productToDelete]);
      }

      return false;
    } finally {
      setIsLoading(false);
    }
  };

  async function onSubmit(values: ProductFormValues) {
    if (!user) return;

    setIsLoading(true);
    setError("");

    try {
      const productData = {
        ...values,
        userId: user.id,
      };

      const response = await fetch("http://localhost:5000/api/crops", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });

      const data = await response.json();

      if (data.success) {
        const newProduct = data.data;
        setApiProducts((prevProducts) => [...prevProducts, newProduct]);
        setOpen(false);
      } else {
        setError(data.message || "Failed to create product");
      }
    } catch (error) {
      console.error("Error creating product:", error);
      setError("An error occurred while creating the product");
    } finally {
      setIsLoading(false);
    }
  }

  async function onUpdateSubmit(values: ProductFormValues) {
    if (!selectedProduct || !user) return;

    setIsLoading(true);
    setError("");

    try {
      const updateData = {
        ...values,
        userId: user.id,
      };

      const response = await fetch(
        `http://localhost:5000/api/crops/${selectedProduct.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updateData),
        }
      );

      const data = await response.json();

      if (data.success) {
        setApiProducts((prevProducts) =>
          prevProducts.map((p) => (p.id === selectedProduct.id ? data.data : p))
        );
        setUpdateOpen(false);
        setSelectedProduct(null);
      } else {
        setError(data.message || "Failed to update product");
      }
    } catch (error) {
      console.error("Error updating product:", error);
      setError("An error occurred while updating the product");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <Toaster position="top-right" />
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-gray-800">Marketplace</h2>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-all duration-300 transform hover:scale-105 active:scale-95">
              + List New Product
            </button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>List New Product</DialogTitle>
              <DialogDescription>
                Enter the details of your product to list it in the marketplace.
              </DialogDescription>
            </DialogHeader>
            <Card>
              <CardContent className="pt-4">
                <ProductForm
                  onSubmit={onSubmit}
                  isLoading={isLoading}
                  submitButtonText="List Product"
                  onCancel={() => setOpen(false)}
                />
              </CardContent>
            </Card>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          </DialogContent>
        </Dialog>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          {
            icon: FaStore,
            title: "Active Listings",
            value: apiProducts.length.toString(),
          },
          { icon: FaShoppingCart, title: "Orders", value: "12" },
          { icon: FaLeaf, title: "Products Sold", value: "1,234 kg" },
          { icon: FaTruck, title: "Deliveries", value: "8 Pending" },
        ].map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="bg-white p-4 rounded-lg shadow-sm flex items-center space-x-4"
            whileHover={{
              y: -5,
              boxShadow:
                "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
            }}
          >
            <div className="bg-emerald-100 p-3 rounded-lg">
              <stat.icon className="h-6 w-6 text-emerald-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">{stat.title}</p>
              <p className="text-lg font-semibold">{stat.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {isLoading && apiProducts.length === 0 ? (
          <div className="col-span-3 py-10 text-center">
            <div className="animate-spin inline-block w-6 h-6 border-b-2 border-emerald-600 rounded-full"></div>
            <p className="mt-2 text-gray-600">Loading products...</p>
          </div>
        ) : apiProducts.length === 0 ? (
          <div className="col-span-3 py-10 text-center">
            <p className="text-gray-600">
              No products found. Add some products to get started!
            </p>
          </div>
        ) : (
          <AnimatePresence>
            {uiProducts.map((product) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{
                  duration: 0.4,
                  ease: [0.25, 0.1, 0.25, 1.0],
                }}
                layout
                className="h-full"
              >
                <ProductCard
                  product={product}
                  onUpdate={handleUpdate}
                  onDelete={handleDelete}
                  showActionButtons={true}
                  ownerId={product.ownerId}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>

      {/* Update Product Dialog */}
      <Dialog open={updateOpen} onOpenChange={setUpdateOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Update Product</DialogTitle>
            <DialogDescription>
              Update the details of your product.
            </DialogDescription>
          </DialogHeader>
          <Card>
            <CardContent className="pt-4">
              {selectedProduct && (
                <ProductForm
                  onSubmit={onUpdateSubmit}
                  isLoading={isLoading}
                  submitButtonText="Update Product"
                  onCancel={() => {
                    setUpdateOpen(false);
                    setSelectedProduct(null);
                  }}
                  defaultValues={{
                    cropName: selectedProduct.cropName,
                    category: selectedProduct.category,
                    variety: selectedProduct.variety,
                    pricePerUnit: selectedProduct.pricePerUnit,
                    totalQuantity: selectedProduct.totalQuantity,
                  }}
                />
              )}
            </CardContent>
          </Card>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Marketplace;
