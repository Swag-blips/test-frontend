import { AuthProvider } from "./providers/AuthProvider";
import { QueryProvider } from "./providers/QueryProvider";
import { ThemeProvider } from "./providers/ThemeProvider";
import { AppRouter } from "./routes";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <QueryProvider>
      <ThemeProvider>
        <AuthProvider>
          <AppRouter />
          <Toaster
            position="top-right"
            toastOptions={{
              className: "font-manrope text-sm font-medium",
              style: {
                background: "var(--surface-variant)",
                color: "var(--on-surface)",
                border: "1px solid var(--outline-variant)",
                backdropFilter: "blur(10px)",
              },
            }}
          />
        </AuthProvider>
      </ThemeProvider>
    </QueryProvider>
  );
}

export default App;
