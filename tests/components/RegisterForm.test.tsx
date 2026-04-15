import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { RegisterForm } from "../../src/features/auth/components/RegisterForm";
import { MemoryRouter } from "react-router-dom";
import { AuthContext, AuthContextType } from "../../src/providers/AuthContext";

describe("RegisterForm Component", () => {
  const mockLogin = vi.fn();
  const mockAuthContext: AuthContextType = {
    user: null,
    isAuthenticated: false,
    isLoading: false,
    login: mockLogin,
    logout: vi.fn(),
  };

  it("renders all registration fields", () => {
    render(
      <AuthContext.Provider value={mockAuthContext}>
        <MemoryRouter>
          <RegisterForm />
        </MemoryRouter>
      </AuthContext.Provider>,
    );

    expect(screen.getByLabelText("Full Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Email Address")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(screen.getByLabelText("Confirm Password")).toBeInTheDocument();
  });

  it("calls login function on valid form submission", async () => {
    render(
      <AuthContext.Provider value={mockAuthContext}>
        <MemoryRouter>
          <RegisterForm />
        </MemoryRouter>
      </AuthContext.Provider>,
    );

    fireEvent.change(screen.getByLabelText("Full Name"), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByLabelText("Email Address"), {
      target: { value: "john@example.com" },
    });
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "password123" },
    });
    fireEvent.change(screen.getByLabelText("Confirm Password"), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByRole("button", { name: /register/i }));

    expect(mockLogin).toHaveBeenCalledWith("john@example.com");
  });
});
