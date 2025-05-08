import * as z from "zod";

export const formSchema = z.object({
  cropName: z
    .string()
    .min(2, { message: "Crop name must be at least 2 characters." })
    .trim(),
  category: z.string().min(1, { message: "Please select a category." }).trim(),
  variety: z.string().min(1, { message: "Please select a variety." }).trim(),
  pricePerUnit: z
    .number()
    .positive({ message: "Price must be a positive number." })
    .or(
      z.string().transform((val) => {
        const parsed = parseFloat(val);
        return isNaN(parsed) ? 0 : parsed;
      })
    ),
  totalQuantity: z
    .number()
    .int()
    .positive({ message: "Quantity must be a positive integer." })
    .or(
      z.string().transform((val) => {
        const parsed = parseInt(val);
        return isNaN(parsed) ? 0 : parsed;
      })
    ),
});

export type ProductFormValues = z.infer<typeof formSchema>;

// Define the Product interface to match database structure
export interface Product {
  id: string;
  cropName: string;
  category: string;
  variety: string;
  pricePerUnit: number;
  totalQuantity: number;
  status: string;
  userId: string;
  image?: string;
  location?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Define UI Product interface
export interface UIProduct {
  id: string;
  name: string;
  price: string;
  quantity: string;
  seller: string;
  location: string;
  image: string;
  variety: string;
  ownerId?: string; // Owner ID for authorization purposes
}
