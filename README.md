# Kisan_Mitra
B2C Marketplace for farmers 
![Screenshot from 2025-05-08 14-16-22](https://github.com/user-attachments/assets/6c7c2e45-589a-468d-b306-90959330a0d8)
![Screenshot from 2025-05-08 14-16-34](https://github.com/user-attachments/assets/c0f2407f-4d94-4ed5-b712-84090bece48b)

# Kisan Mitra - Farmer Marketplace Platform


![Screenshot from 2025-05-08 14-16-22](https://github.com/user-attachments/assets/6957bc5b-e9d2-447e-bd9c-e552af9a2a59)

## Product Listing API Integration

This document explains how the product listing feature works in the Kisan Mitra application.

![Screenshot from 2025-05-08 14-18-28](https://github.com/user-attachments/assets/cc6cdb7e-ae10-446f-8e8a-04a5ab5bd074)
![Screenshot from 2025-05-08 14-18-14](https://github.com/user-attachments/assets/1e3dcc26-3743-433c-8b35-5217c1e56faa)


### Backend Setup

1. **Database Schema**: The MongoDB collection for `Crops` includes the following fields:

   - `_id`: ObjectId (auto-generated)
   - `cropName`: String
   - `category`: String
   - `variety`: String
   - `pricePerUnit`: Number
   - `totalQuantity`: Number
   - `status`: String (default: "active")
   - `userId`: ObjectId (reference to the Users collection)

2. **API Endpoints**:

   - `POST /api/products` - Creates a new product listing
   - `GET /api/products` - Retrieves all active product listings

3. **Request/Response Format for POST /api/products**:

   ```json
   // Request Body
   {
     "cropName": "Tomatoes",
     "category": "vegetables",
     "variety": "Cherry",
     "pricePerUnit": 75.50,
     "totalQuantity": 100,
     "userId": "user-123"
   }

   // Success Response
   {
     "success": true,
     "data": {
       "_id": "64f1a2b3c4d5e6f7g8h9i0j1",
       "cropName": "Tomatoes",
       "category": "vegetables",
       "variety": "Cherry",
       "pricePerUnit": 75.50,
       "totalQuantity": 100,
       "status": "active",
       "userId": "user-123"
     }
   }

   // Error Response
   {
     "success": false,
     "message": "Missing required fields",
     "error": "Error details here"
   }
   ```

### Frontend Integration
![Screenshot from 2025-05-08 14-18-38](https://github.com/user-attachments/assets/5642aa07-ee48-4716-9bdd-d687d08ba9b0)

1. **Modal Form**: The marketplace has a "List New Product" button that opens a modal with a form containing:

   - Crop Name (text input)
   - Category (dropdown)
   - Variety (optional text input)
   - Price Per Unit (number input)
   - Total Quantity (number input)

2. **Form Validation**: Uses Zod schema validation to ensure:

   - Crop name is at least 2 characters
   - Category is selected
   - Price is a positive number
   - Quantity is a positive integer

3. **API Integration**:

   - Form submission sends data to `http://localhost:3000/api/products`
   - Success adds the new product to the UI without page refresh
   - Errors are displayed to the user

4. **Data Display**: Products from the API are combined with static demo products and displayed in a responsive grid.

### How to Run

1. Start the backend server:

   ```
   cd backend
   npm install
   npm run dev
   ```

   Ensure MongoDB is running locally or provide a connection string in the environment variables.

2. Start the frontend:

   ```
   npm install
   npm run dev
   ```

3. Access the application at `http://localhost:5173`

