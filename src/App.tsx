import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import {
  ClerkProvider,
  SignIn,
  SignUp,
  SignedIn,
  SignedOut,
  RedirectToSignIn,
  ClerkLoaded,
  ClerkLoading,
} from "@clerk/clerk-react";
import Navbar from "./components/common/Navbar";
import Hero from "./components/landing/Hero";
import About from "./components/landing/About";
import Features from "./components/landing/Features";
import Footer from "./components/common/Footer";
import DashboardLayout from "./components/dashboard/DashboardLayout";
import DashboardHome from "./components/dashboard/pages/DashboardHome";
import { LanguageProvider } from "./contexts/LanguageContext";
import { AuthProvider } from "./contexts/AuthContext";
import Marketplace from "./components/dashboard/pages/Marketplace";
import AIInsights from "./components/dashboard/pages/AIInsights";
import Logistics from "./components/dashboard/pages/Logistics";
import AuthLayout from "./components/auth/AuthLayout";

// Get the publishable key from environment variables
const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!clerkPubKey) {
  throw new Error("Missing Clerk Publishable Key");
}

// Shared appearance settings for Clerk components
const clerkAppearance = {
  elements: {
    rootBox: "mx-auto",
    card: "bg-white shadow-md rounded-lg",
    headerTitle: "text-emerald-600 text-xl",
    headerSubtitle: "text-gray-500",
    socialButtonsBlockButton: "border border-gray-300 hover:bg-gray-50",
    formButtonPrimary: "bg-emerald-600 hover:bg-emerald-700",
    footerActionLink: "text-emerald-600 hover:text-emerald-700",
  },
};

// Authentication strategies to enable
const signInProps = {
  routing: "path" as const,
  path: "/sign-in",
  signUpUrl: "/sign-up",
  appearance: clerkAppearance,
  socialButtonsPlacement: "top" as const,
  redirectUrl: "/dashboard",
};

const signUpProps = {
  routing: "path" as const,
  path: "/sign-up",
  signInUrl: "/sign-in",
  appearance: clerkAppearance,
  socialButtonsPlacement: "top" as const,
  redirectUrl: "/dashboard",
};

function App() {
  return (
    <ClerkProvider
      publishableKey={clerkPubKey}
      appearance={{
        layout: {
          socialButtonsVariant: "iconButton",
          socialButtonsPlacement: "top",
        },
        variables: {
          colorPrimary: "#059669",
        },
        elements: {
          formButtonPrimary: "bg-emerald-600 hover:bg-emerald-700",
          footerActionLink: "text-emerald-600 hover:text-emerald-700",
        },
      }}
    >
      <AuthProvider>
        <LanguageProvider>
          <Router>
            <div className="min-h-screen">
              <Routes>
                {/* Public routes */}
                <Route
                  path="/"
                  element={
                    <div className="flex flex-col">
                      <Navbar />
                      <main>
                        <Hero />
                        <About />
                        <Features />
                      </main>
                      <Footer />
                    </div>
                  }
                />

                {/* Clerk auth routes */}
                <Route
                  path="/sign-in/*"
                  element={
                    <AuthLayout title="Sign in to Kisan Mitra">
                      <SignIn {...signInProps} />
                    </AuthLayout>
                  }
                />

                <Route
                  path="/sign-up/*"
                  element={
                    <AuthLayout title="Create your Kisan Mitra account">
                      <SignUp {...signUpProps} />
                    </AuthLayout>
                  }
                />

                {/* Redirect old routes to new Clerk routes */}
                <Route
                  path="/login"
                  element={<Navigate to="/sign-in" replace />}
                />
                <Route
                  path="/signup"
                  element={<Navigate to="/sign-up" replace />}
                />

                {/* Clerk OAuth callback handling */}
                <Route
                  path="/sso-callback"
                  element={
                    <AuthLayout title="Completing your sign in...">
                      <ClerkLoading>
                        <div className="text-center p-4">
                          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mx-auto"></div>
                          <p className="mt-4 text-gray-600">
                            Authenticating...
                          </p>
                        </div>
                      </ClerkLoading>
                      <ClerkLoaded>
                        <div className="text-center p-4">
                          <p className="text-gray-600">
                            Redirecting you to your dashboard...
                          </p>
                        </div>
                      </ClerkLoaded>
                    </AuthLayout>
                  }
                />

                {/* Dashboard routes - protected by Clerk */}
                <Route
                  path="/dashboard"
                  element={
                    <>
                      <SignedIn>
                        <DashboardLayout />
                      </SignedIn>
                      <SignedOut>
                        <RedirectToSignIn />
                      </SignedOut>
                    </>
                  }
                >
                  <Route index element={<DashboardHome />} />
                  <Route path="marketplace" element={<Marketplace />} />
                  <Route path="ai-insights" element={<AIInsights />} />
                  <Route path="logistics" element={<Logistics />} />
                  <Route path="finance" element={<div>Finance</div>} />
                  <Route path="community" element={<div>Community</div>} />
                  <Route path="settings" element={<div>Settings</div>} />
                  <Route path="profile" element={<div>Profile</div>} />
                </Route>

                {/* Catch all route */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </div>
          </Router>
        </LanguageProvider>
      </AuthProvider>
    </ClerkProvider>
  );
}

export default App;
