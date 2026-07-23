import { useEffect, useState } from "react";

import { clearToken, getToken } from "@/lib/auth-token";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

type MeResponse = {
  user: { id: string; email: string; isAdmin: boolean };
};

export interface AuthState {
  session: null;
  user: { id: string; email: string } | null;
  isAdmin: boolean;
  loading: boolean;
}

export function useAuth(): AuthState {
  const [user, setUser] = useState<AuthState["user"]>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMe() {
      const token = getToken();
      if (!token) {
        setUser(null);
        setIsAdmin(false);
        setLoading(false);
        return;
      }

      try {
        const resp = await fetch(`${API_URL}/auth/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = (await resp.json().catch(() => ({}))) as Partial<MeResponse>;

        if (!resp.ok || !data.user) {
          clearToken();
          setUser(null);
          setIsAdmin(false);
          setLoading(false);
          return;
        }

        setUser({ id: data.user.id, email: data.user.email });
        setIsAdmin(!!data.user.isAdmin);
      } catch {
        // keep loading false, but don't wipe token (network issue)
      } finally {
        setLoading(false);
      }
    }

    loadMe();
  }, []);

  return { session: null, user, isAdmin, loading };
}


