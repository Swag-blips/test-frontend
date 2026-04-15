import { useState } from "react";
import { AtSign, Lock, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../providers/AuthContext";
import { Input } from "../../../components/ui/Input";
import { Button } from "../../../components/ui/Button";
import toast from "react-hot-toast";

export const LoginForm = () => {
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email);
      toast.success("Welcome back!");
      navigate("/");
    } catch {
      toast.error("Login failed. Please check your credentials.");
    }
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <Input
        id="email"
        type="email"
        label="Email Address"
        icon={<AtSign size={18} className="text-on-surface-variant" />}
        placeholder="alex@devchallenge.io"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <Input
        id="password"
        type="password"
        label="Password"
        icon={<Lock size={18} className="text-on-surface-variant" />}
        placeholder="••••••••"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <div className="pt-4">
        <Button type="submit" icon={ArrowRight} isLoading={isLoading}>
          {isLoading ? "Logging in..." : "Log In"}
        </Button>
      </div>
    </form>
  );
};
