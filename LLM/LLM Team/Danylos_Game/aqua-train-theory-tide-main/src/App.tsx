
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Underwater from "./pages/Underwater";
import Desert from "./pages/Desert";
import Antarctic from "./pages/Antarctic";
import Lava from "./pages/Lava";
import Space from "./pages/Space";
import NotFound from "./pages/NotFound";
import { ExperienceProvider } from "./context/ExperienceContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ExperienceProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/underwater" element={<Underwater />} />
            <Route path="/desert" element={<Desert />} />
            <Route path="/antarctic" element={<Antarctic />} />
            <Route path="/lava" element={<Lava />} />
            <Route path="/space" element={<Space />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </ExperienceProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
