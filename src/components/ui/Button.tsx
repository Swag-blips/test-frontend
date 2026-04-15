import type { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  icon?: string;
  isLoading?: boolean;
}

export const Button = ({
  children,
  icon,
  isLoading,
  ...props
}: ButtonProps) => {
  return (
    <button
      className="w-full bg-linear-to-br from-primary to-primary-container text-on-primary font-manrope font-bold py-4 rounded-lg shadow-lg shadow-primary/10 hover:shadow-primary/20 hover:scale-[1.01] active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-75 disabled:cursor-wait"
      disabled={isLoading || props.disabled}
      {...props}
    >
      <span>{isLoading ? "Processing..." : children}</span>
      {icon && !isLoading && (
        <span className="material-symbols-outlined text-lg">{icon}</span>
      )}
    </button>
  );
};
