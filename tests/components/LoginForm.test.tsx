import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { LoginForm } from "../../src/features/auth/components/LoginForm";
import { MemoryRouter } from "react-router-dom";
import { AuthContext, AuthContextType } from "../../src/providers/AuthContext";

describe("LoginForm Component", () => {
  const mockLogin = vi.fn();
  const mockAuthContext: AuthContextType = {
    user: null,
    isAuthenticated: false,
    isLoading: false,
    login: mockLogin,
    logout: vi.fn(),
  };

  it("renders email and password inputs", () => {
    render(
      <AuthContext.Provider value={mockAuthContext}>
        <MemoryRouter>
          <LoginForm />
        </MemoryRouter>
      </AuthContext.Provider>,
    );

    expect(screen.getByLabelText("Email Address")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /log in/i })).toBeInTheDocument();
  });

  it("calls login function on form submission", async () => {
    render(
      <AuthContext.Provider value={mockAuthContext}>
        <MemoryRouter>
          <LoginForm />
        </MemoryRouter>
      </AuthContext.Provider>,
    );

    fireEvent.change(screen.getByLabelText("Email Address"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByRole("button", { name: /log in/i }));

    expect(mockLogin).toHaveBeenCalledWith("test@example.com");
  });
});
