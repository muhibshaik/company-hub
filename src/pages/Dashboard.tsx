import { Link } from 'react-router-dom';
import {
  Building2,
  Briefcase,
  Users,
  Settings,
  ArrowRight,
} from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';

const menuItems = [
  {
    path: '/company-profile',
    label: 'Company Profile',
    subtitle: 'Manage your details',
    description: 'View and manage your company information, branding, and professional details',
    icon: Building2,
    gradient: 'bg-gradient-to-r from-emerald-400 to-cyan-500',
  },
  {
    path: '/jobs',
    label: 'Job Opportunities',
    subtitle: 'View posted jobs',
    description: 'Browse all jobs posted for your company and track applicant activity',
    icon: Briefcase,
    gradient: 'bg-gradient-to-r from-blue-500 to-purple-500',
  },
  {
    path: '/applicants',
    label: 'Applicants',
    subtitle: 'Review candidates',
    description: 'Monitor your job applications, review candidates, and manage recruitment progress',
    icon: Users,
    gradient: 'bg-gradient-to-r from-purple-500 to-pink-500',
  },
  {
    path: '/settings',
    label: 'Settings',
    subtitle: 'Account preferences',
    description: 'Configure your account settings, notifications, and security preferences',
    icon: Settings,
    gradient: 'bg-gradient-to-r from-orange-400 to-red-500',
  },
];

export default function Dashboard() {
  return (
    <DashboardLayout>
      <div className="animate-fade-in">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground">Welcome Back!</h1>
          <p className="mt-1 text-muted-foreground">
            Access all your recruitment tools and information from one central dashboard
          </p>
        </div>

        {/* Menu Tiles Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {menuItems.map((item) => (
            <Link key={item.path} to={item.path} className="group">
              <div className="h-full overflow-hidden rounded-2xl bg-card shadow-sm border border-border/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                {/* Gradient Header */}
                <div className={`${item.gradient} p-5`}>
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/20 backdrop-blur-sm">
                    <item.icon className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="mt-3 text-lg font-semibold text-white">
                    {item.label}
                  </h3>
                  <p className="text-sm text-white/80">{item.subtitle}</p>
                </div>

                {/* White Content Area */}
                <div className="bg-card p-5">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                  <div className="mt-4 flex items-center text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                    Click to access
                    <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
