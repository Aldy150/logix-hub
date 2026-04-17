import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CRMLayout } from "@/components/CRMLayout";
import Dashboard from "./pages/Dashboard";
import Contacts from "./pages/Contacts";
import Pipeline from "./pages/Pipeline";
import Activities from "./pages/Activities";
import Reports from "./pages/Reports";
import NotFound from "./pages/NotFound";
import Inscription from "./pages/inscription";
import Connexion from "./pages/connexion";
import AjoutClient from "./pages/AjoutClient";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<CRMLayout><Dashboard /></CRMLayout>} />
          <Route path="/contacts" element={<CRMLayout><Contacts /></CRMLayout>} />
          <Route path="/pipeline" element={<CRMLayout><Pipeline /></CRMLayout>} />
          <Route path="/activities" element={<CRMLayout><Activities /></CRMLayout>} />
          <Route path="/reports" element={<CRMLayout><Reports /></CRMLayout>} />
          <Route path="*" element={<NotFound />} />
          <Route path="/inscription" element={<Inscription />} />
          <Route path="/connexion" element={<Connexion />} />
          <Route path="/client" element={<AjoutClient />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
