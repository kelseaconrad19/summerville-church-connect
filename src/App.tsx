
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./components/AuthProvider";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import LeadershipPage from "./pages/LeadershipPage";
import SermonsPage from "./pages/SermonsPage";
import EventsPage from "./pages/EventsPage";
import MinistriesPage from "./pages/MinistriesPage";
import PrayerRequestPage from "./pages/PrayerRequestPage";
import ContactPage from "./pages/ContactPage";
import AuthPage from "./pages/AuthPage";
import NotFound from "./pages/NotFound";
import ClassesPage from "./pages/ClassesPage";
import { AdminLayout } from "./components/admin/AdminLayout";
import DashboardPage from "./pages/admin/DashboardPage";
import AdminEventsPage from "./pages/admin/EventsPage";
import AdminMinistriesPage from "./pages/admin/MinistriesPage";
import AdminSermonsPage from "./pages/admin/SermonsPage";
import AdminUsersPage from "./pages/admin/UsersPage";
import AdminClassesPage from "./pages/admin/ClassesPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/leadership" element={<LeadershipPage />} />
              <Route path="/sermons" element={<SermonsPage />} />
              <Route path="/events" element={<EventsPage />} />
              <Route path="/ministries" element={<MinistriesPage />} />
              <Route path="/classes" element={<ClassesPage />} />
              <Route path="/prayer-request" element={<PrayerRequestPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/profile" element={<AboutPage />} /> {/* Temporary placeholder */}
              <Route path="*" element={<NotFound />} />
            </Route>
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<DashboardPage />} />
              <Route path="events" element={<AdminEventsPage />} />
              <Route path="ministries" element={<AdminMinistriesPage />} />
              <Route path="sermons" element={<AdminSermonsPage />} />
              <Route path="classes" element={<AdminClassesPage />} />
              <Route path="users" element={<AdminUsersPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
