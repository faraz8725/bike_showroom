import { Link } from "@tanstack/react-router";

// If you only use React Router for navigation, avoid mixing with TanStack Router.
// (This file is .tsx and must be valid TS/JS for Vite.)
import { Flame, LogOut, ShieldCheck } from "lucide-react";
import { useAuth } from "@/lib/use-auth";
import { clearToken, getToken } from "@/lib/auth-token";
import { Button } from "@/components/ui/button";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

export function SiteHeader() {
  const { user, isAdmin } = useAuth();

  return (

    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur">
      <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 py-3 sm:px-6">
        <Link to="/" className="flex min-w-0 items-center gap-2">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-md bg-gradient-flame shadow-flame">
            <Flame className="h-5 w-5 text-flame-foreground" strokeWidth={2.5} />
          </span>
          <span className="truncate font-display text-2xl tracking-wide">
            IRON<span className="text-gradient-flame">FORGE</span> MOTORS
          </span>
        </Link>
        <nav className="flex items-center gap-2">
          <Link
            to="/"
            className="hidden rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground sm:inline-flex"
          >
            Browse
          </Link>
          {isAdmin && (
            <Link to="/admin">
              <Button variant="outline" size="sm" className="gap-1.5">
                <ShieldCheck className="h-4 w-4" /> Admin
              </Button>
            </Link>
          )}
          {user ? (
            <Button
              variant="ghost"
              size="sm"
              onClick={async () => {
                const token = getToken();
                try {
                  if (token) {
                    await fetch(`${API_URL}/auth/logout`, {
                      method: "POST",
                      headers: { Authorization: `Bearer ${token}` },
                    });
                  }
                } finally {
                  clearToken();
                  window.location.assign("/auth");
                }
              }}
              className="gap-1.5"
            >
              <LogOut className="h-4 w-4" /> Sign out
            </Button>
          ) : (
            <Link to="/auth">
              <Button size="sm" className="bg-gradient-flame text-flame-foreground hover:opacity-90">
                Admin Login
              </Button>
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}

