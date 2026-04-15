import { Outlet, useLocation, Navigate } from "react-router-dom";
import { useAuth } from "../../providers/AuthContext";
import { useTheme } from "../../providers/ThemeContext";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const RootLayout = () => {
  const { user, isAuthenticated, isLoading, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const queryClient = useQueryClient();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-surface">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  const isAuthPage = location.pathname === "/login";

  if (!isAuthenticated && !isAuthPage) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (isAuthenticated && isAuthPage) {
    return <Navigate to="/" replace />;
  }

  if (isAuthPage) {
    return <Outlet />;
  }

  const handleLogout = async () => {
    await logout();
    toast.success("Logged out successfully");
  };

  const handleInvalidateCache = () => {
    queryClient.invalidateQueries();
    toast.success("Cache cleared & Refetching...");
  };

  return (
    <div className="min-h-screen bg-background text-on-background transition-colors duration-300">
      <header className="fixed top-0 left-0 right-0 h-20 z-50 bg-surface/80 backdrop-blur-md border-b border-outline-variant/10 flex items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <h1 className="font-headline text-lg font-bold tracking-tight text-primary">
            Nexus
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleInvalidateCache}
            className="p-2 rounded-full hover:bg-primary/10 transition-colors text-primary"
            title="Refresh Data / Clear Cache"
          >
            <span className="material-symbols-outlined">refresh</span>
          </button>

          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-surface-variant transition-colors text-on-surface-variant"
            title={
              theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"
            }
          >
            <span className="material-symbols-outlined">
              {theme === "dark" ? "light_mode" : "dark_mode"}
            </span>
          </button>

          <div className="flex items-center gap-3 pl-3 border-l border-outline-variant/20">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center font-bold text-xs uppercase text-primary border border-primary/20">
              {isAuthenticated && user?.name ? user.name[0] : "?"}
            </div>
            <button
              onClick={handleLogout}
              className="p-2 rounded-full hover:bg-error/10 transition-colors text-error"
              title="Logout"
            >
              <span className="material-symbols-outlined">logout</span>
            </button>
          </div>
        </div>
      </header>

      <Outlet />
    </div>
  );
};
