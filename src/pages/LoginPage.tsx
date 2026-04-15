import { useState } from "react";
import { LoginForm } from "../features/auth/components/LoginForm";
import { RegisterForm } from "../features/auth/components/RegisterForm";
import { FeatureCard } from "../features/auth/components/FeatureCard";

export const LoginPage = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  
  return (
    <div className="bg-surface flex min-h-[calc(100vh-8rem)] items-center justify-center p-6 relative overflow-hidden font-body rounded-2xl">
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] bg-primary/10 blur-[120px] rounded-full"></div>
        <div className="absolute -bottom-[10%] -right-[10%] w-[50%] h-[50%] bg-primary-container/10 blur-[120px] rounded-full"></div>
      </div>
      <main className="w-full max-w-md z-10">
        <div className="bg-surface-container-low p-8 md:p-12 rounded-xl shadow-[0px_20px_50px_rgba(0,0,0,0.5)] border border-outline-variant/10 relative overflow-hidden">
          <div className="mb-10 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-linear-to-br from-primary to-primary-container mb-6 shadow-lg shadow-primary/20">
              <span
                className="material-symbols-outlined text-on-primary text-3xl"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                shield_person
              </span>
            </div>
            <h1 className="font-manrope text-3xl font-extrabold text-on-surface tracking-tighter mb-2">
              {isRegistering ? "Create Account" : "Welcome Back"}
            </h1>
            <p className="text-on-surface-variant font-medium text-sm">
              {isRegistering
                ? "Join the DevChallenge community today."
                : "Log in to the DevChallenge community."}
            </p>
          </div>

          {isRegistering ? <RegisterForm /> : <LoginForm />}

          <div className="mt-8 pt-8 border-t border-outline-variant/10 text-center">
            <p className="text-on-surface-variant text-sm font-medium">
              {isRegistering
                ? "Already have an account?"
                : "Don't have an account?"}
              <span
                className="text-primary font-bold hover:underline underline-offset-4 ml-1 cursor-pointer"
                onClick={() => setIsRegistering(!isRegistering)}
              >
                {isRegistering ? "Log in" : "Register"}
              </span>
            </p>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-4">
          <FeatureCard
            icon="auto_awesome"
            title="Curated Path"
            description="Personalized challenges for your skill level."
          />
          <FeatureCard
            icon="workspace_premium"
            title="Verified Skills"
            description="Showcase certificates on your profile."
          />
        </div>
      </main>
    </div>
  );
};
