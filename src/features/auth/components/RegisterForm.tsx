import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../providers/AuthContext";
import { Input } from "../../../components/ui/Input";
import { Button } from "../../../components/ui/Button";
import toast from "react-hot-toast";

export const RegisterForm = () => {
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords don't match. Please check again.");
      return;
    }

    try {
      // Mock registration by utilizing login sequence
      await login(email);
      toast.success(`Welcome, ${fullName || "Developer"}!`);
      navigate("/");
    } catch {
      toast.error("Registration failed. Please try again.");
    }
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <Input
        id="full_name"
        type="text"
        label="Full Name"
        icon={<span className="material-symbols-outlined text-xl">person</span>}
        placeholder="Alex Rivera"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        required
      />

      <Input
        id="email"
        type="email"
        label="Email Address"
        icon={
          <span className="material-symbols-outlined text-xl">
            alternate_email
          </span>
        }
        placeholder="alex@devchallenge.io"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <Input
        id="password"
        type="password"
        label="Password"
        icon={<span className="material-symbols-outlined text-xl">lock</span>}
        placeholder="••••••••"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <Input
        id="confirm_password"
        type="password"
        label="Confirm Password"
        icon={
          <span className="material-symbols-outlined text-xl">
            verified_user
          </span>
        }
        placeholder="••••••••"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
      />

      <div className="pt-4">
        <Button type="submit" icon="arrow_forward" isLoading={isLoading}>
          {isLoading ? "Registering..." : "Register"}
        </Button>
      </div>
    </form>
  );
};
