import React, { useState } from "react";
import { UIProduct } from "../types/marketplace";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { useUser } from "@clerk/clerk-react";
import { motion } from "framer-motion";

type ProductCardProps = {
  product: UIProduct;
  onUpdate: (product: UIProduct) => void;
  onDelete: (productId: string) => Promise<boolean>;
  showActionButtons?: boolean;
  ownerId?: string;
};

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onUpdate,
  onDelete,
  showActionButtons = true,
  ownerId,
}) => {
  const { user } = useUser();
  const [isDeleting, setIsDeleting] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Determine if the current user owns this product
  // If ownerId is provided, use it for comparison, otherwise default to true for backward compatibility
  const isOwner = ownerId ? user?.id === ownerId : true;

  // Only show action buttons if explicitly requested AND user owns the product
  const shouldShowActions = showActionButtons && isOwner;

  const handleDelete = async () => {
    try {
      setIsDeleting(true);

      // Add delay to show loading state
      const success = await onDelete(product.id);

      if (success) {
        toast.success("Product deleted successfully");
      } else {
        // If onDelete returns false, the operation failed but didn't throw an error
        toast.error("Failed to delete product");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Failed to delete product");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleUpdate = () => {
    onUpdate(product);
  };

  return (
    <motion.div
      className="bg-white rounded-lg shadow-sm overflow-hidden transition-shadow duration-300 hover:shadow-md h-full"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative overflow-hidden">
        <motion.img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover"
          animate={{
            scale: isHovered ? 1.05 : 1,
          }}
          transition={{ duration: 0.4 }}
        />
        {isHovered && (
          <motion.div
            className="absolute inset-0 bg-black bg-opacity-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          />
        )}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold">{product.name}</h3>
        <div className="flex justify-between items-center mb-1">
          <p className="text-emerald-600 font-medium">{product.price}</p>
          <span className="text-xs px-2 py-1 bg-emerald-100 text-emerald-800 rounded-full">
            {product.variety}
          </span>
        </div>
        <p className="text-gray-600 text-sm">{product.quantity}</p>
        <div className="mt-4 flex justify-between items-center">
          <div className="text-sm">
            <p className="font-medium">{product.seller}</p>
            <p className="text-gray-600">{product.location}</p>
          </div>

          {shouldShowActions && (
          <div className="flex space-x-2">
              <motion.button
                onClick={handleUpdate}
                className="bg-emerald-100 text-emerald-600 px-4 py-2 rounded-lg hover:bg-emerald-200 transition"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
              Update
              </motion.button>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <motion.button
                    className="bg-red-100 text-red-600 px-4 py-2 rounded-lg hover:bg-red-200 transition"
                    disabled={isDeleting}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {isDeleting ? (
                      <div className="flex items-center">
                        <svg
                          className="animate-spin -ml-1 mr-1 h-3 w-3 text-red-600"
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
                        Deleting...
                      </div>
                    ) : (
                      "Delete"
                    )}
                  </motion.button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      the product "{product.name}" from the marketplace.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="transition-all duration-200 hover:bg-gray-100">
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleDelete}
                      className="bg-red-600 text-white hover:bg-red-700 transition-colors duration-200"
            >
              Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
          </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
