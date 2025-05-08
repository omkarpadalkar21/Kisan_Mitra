import React, { createContext, useContext } from "react";
import { useUser, useAuth as useClerkAuth, useClerk } from "@clerk/clerk-react";

interface User {
  email: string;
  id?: string;
  firstName?: string;
  lastName?: string;
  imageUrl?: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  isLoaded: boolean;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  user: null,
  isLoaded: false,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // Use Clerk's hooks for authentication state
  const { isLoaded, isSignedIn } = useClerkAuth();
  const { user: clerkUser } = useUser();

  // Map Clerk user to our User interface
  const user: User | null = clerkUser
    ? {
        email: clerkUser.primaryEmailAddress?.emailAddress || "",
        id: clerkUser.id,
        firstName: clerkUser.firstName || undefined,
        lastName: clerkUser.lastName || undefined,
        imageUrl: clerkUser.imageUrl || undefined,
      }
    : null;

  // Check if user is authenticated with Clerk
  const isAuthenticated = isLoaded && !!isSignedIn;

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, isLoaded }}>
      {children}
    </AuthContext.Provider>
  );
};
