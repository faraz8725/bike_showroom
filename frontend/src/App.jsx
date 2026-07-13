import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/sonner";

import { supabase } from "@/integrations/supabase/client";
import { Home } from "./pages/Home.jsx";
import { AuthPage } from "./pages/AuthPage.jsx";
import { AdminPage } from "./pages/AdminPage.jsx";
import { BikeDetail } from "./pages/BikeDetail.jsx";

export default function App() {
  const queryClient = React.useMemo(() => new QueryClient(), []);

  useEffect(() => {
    const sub = supabase.auth.onAuthStateChange((event) => {
      // Keep behavior consistent with TanStack root: invalidate on auth changes.
      if (event === "SIGNED_IN" || event === "SIGNED_OUT" || event === "USER_UPDATED") {
        queryClient.invalidateQueries();
      }
    });
    return () => sub.data.subscription.unsubscribe();
  }, [queryClient]);

  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/bikes/:id" element={<BikeDetail />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Toaster theme="dark" position="top-right" richColors />
    </QueryClientProvider>
  );
}

