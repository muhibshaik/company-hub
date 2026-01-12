import { Link } from 'react-router-dom';
import {
  LayoutDashboard,
  Building2,
  Briefcase,
  Users,
  Settings,
} from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

const menuItems = [
  {
    path: '/',
    label: 'Dashboard',
    description: 'View your recruitment overview and quick stats',
    icon: LayoutDashboard,
    gradient: 'from-primary to-primary/80',
  },
  {
    path: '/company-profile',
    label: 'My Company Profile',
    description: 'Manage your company details and branding',
    icon: Building2,
    gradient: 'from-accent to-accent/80',
  },
  {
    path: '/jobs',
    label: 'My Jobs',
    description: 'View all jobs posted for your company',
    icon: Briefcase,
    gradient: 'from-info to-info/80',
  },
  {
    path: '/applicants',
    label: 'Applicants',
    description: 'Review and manage job applicants',
    icon: Users,
    gradient: 'from-success to-success/80',
  },
  {
    path: '/settings',
    label: 'Settings',
    description: 'Configure your account preferences',
    icon: Settings,
    gradient: 'from-muted-foreground to-muted-foreground/80',
  },
];

export default function Dashboard() {
  return (
    <DashboardLayout>
      <div className="animate-fade-in">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
          <p className="mt-1 text-muted-foreground">
            Welcome back! Navigate to any section using the tiles below.
          </p>
        </div>

        {/* Menu Tiles Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {menuItems.map((item) => (
            <Link key={item.path} to={item.path}>
              <Card className="group h-full cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border-border/50 hover:border-primary/30">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div
                      className={cn(
                        'flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br shadow-md transition-transform duration-300 group-hover:scale-110',
                        item.gradient
                      )}
                    >
                      <item.icon className="h-7 w-7 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-foreground text-lg group-hover:text-primary transition-colors">
                        {item.label}
                      </h3>
                      <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
