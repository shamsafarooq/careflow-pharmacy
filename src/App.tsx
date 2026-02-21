import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { CustomerLayout } from "@/components/layout/CustomerLayout";
import Index from "./pages/Index";
import MedicinesPage from "./pages/MedicinesPage";
import MedicineDetailPage from "./pages/MedicineDetailPage";
import CategoriesPage from "./pages/CategoriesPage";
import CalculatorPage from "./pages/CalculatorPage";
import AuthPage from "./pages/AuthPage";
import ProfilePage from "./pages/ProfilePage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<CustomerLayout />}>
              <Route path="/" element={<Index />} />
              <Route path="/medicines" element={<MedicinesPage />} />
              <Route path="/medicines/:id" element={<MedicineDetailPage />} />
              <Route path="/categories" element={<CategoriesPage />} />
              <Route path="/calculator" element={<CalculatorPage />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/profile" element={<ProfilePage />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
