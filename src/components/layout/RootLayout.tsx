import { Outlet, useLocation, Navigate } from "react-router-dom";
import { useAuth } from "../../providers/AuthProvider";

export const RootLayout = () => {
  const { user, isAuthenticated, isLoading } = useAuth();
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

  return (
    <>
      <header className="fixed top-0 left-0 right-0 h-20 z-50 bg-[#0b1326]/80 backdrop-blur-md border-b border-white/5 flex items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <h1 className="font-headline text-lg font-bold tracking-tight text-primary">
            Posts
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-surface-container-high overflow-hidden border border-primary/20 flex items-center justify-center font-bold text-xs uppercase text-primary">
            {isAuthenticated && user?.name ? user.name[0] : "?"}
          </div>
        </div>
      </header>

      <Outlet />
    </>
  );
};
