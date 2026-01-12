import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  variant?: 'primary' | 'accent' | 'info' | 'success';
  subtitle?: string;
}

const variantClasses = {
  primary: 'stat-card-primary',
  accent: 'stat-card-accent',
  info: 'stat-card-info',
  success: 'stat-card-success',
};

export function StatCard({
  title,
  value,
  icon: Icon,
  variant = 'primary',
  subtitle,
}: StatCardProps) {
  return (
    <div
      className={cn(
        'rounded-2xl p-6 text-primary-foreground shadow-card transition-all duration-200 hover:shadow-elevated hover:-translate-y-0.5',
        variantClasses[variant]
      )}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium opacity-90">{title}</p>
          <p className="mt-2 text-3xl font-bold">{value}</p>
          {subtitle && (
            <p className="mt-1 text-sm opacity-75">{subtitle}</p>
          )}
        </div>
        <div className="rounded-xl bg-primary-foreground/20 p-3">
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </div>
  );
}
