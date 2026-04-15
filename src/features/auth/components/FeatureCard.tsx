import type { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const FeatureCard = ({
  icon: Icon,
  title,
  description,
}: FeatureCardProps) => {
  return (
    <div className="bg-surface-container p-5 rounded-xl border border-outline-variant/10 flex items-center gap-4">
      <div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center text-primary">
        <Icon size={20} />
      </div>
      <div>
        <h4 className="font-manrope font-bold text-xs uppercase tracking-tighter text-on-surface">
          {title}
        </h4>
        <p className="text-on-surface-variant text-[11px]">{description}</p>
      </div>
    </div>
  );
};
