import type { InputHTMLAttributes, ReactNode } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon: ReactNode;
}

export const Input = ({ label, icon, id, ...props }: InputProps) => {
  return (
    <div className="space-y-1.5">
      <label
        className="font-manrope text-[10px] uppercase tracking-widest font-bold text-primary px-1"
        htmlFor={id}
      >
        {label}
      </label>
      <div className="relative mt-2.5 group">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-outline group-focus-within:text-primary transition-colors">
          {icon}
        </div>
        <input
          id={id}
          className="w-full bg-surface-container-lowest border-none text-on-surface text-sm rounded-lg pl-11 pr-4 py-3.5 focus:ring-2 focus:ring-primary/30 transition-all placeholder:text-outline-variant"
          {...props}
        />
      </div>
    </div>
  );
};
