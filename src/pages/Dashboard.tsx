import { Link } from 'react-router-dom';
import {
  Building2,
  Briefcase,
  Users,
  Settings,
  ArrowUpRight,
} from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';

const menuItems = [
  {
    path: '/company-profile',
    label: 'Company Profile',
    description: 'Manage branding and professional identity.',
    icon: Building2,
    color: 'emerald',
  },
  {
    path: '/jobs',
    label: 'Job Opportunities',
    description: 'Track active listings and performance.',
    icon: Briefcase,
    color: 'blue',
  },
  {
    path: '/applicants',
    label: 'Applicants',
    description: 'Review and manage your talent pipeline.',
    icon: Users,
    color: 'purple',
  },
  {
    path: '/settings',
    label: 'Settings',
    description: 'Account security and notifications.',
    icon: Settings,
    color: 'rose',
  },
];

const colorVariants: Record<string, string> = {
  emerald: 'bg-emerald-500/10 text-emerald-600 group-hover:bg-emerald-500 group-hover:text-white',
  blue: 'bg-blue-500/10 text-blue-600 group-hover:bg-blue-500 group-hover:text-white',
  purple: 'bg-purple-500/10 text-purple-600 group-hover:bg-purple-500 group-hover:text-white',
  rose: 'bg-rose-500/10 text-rose-600 group-hover:bg-rose-500 group-hover:text-white',
};

export default function Dashboard() {
  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto p-4 md:p-8 animate-in fade-in duration-500">
        {/* Header Section */}
        <header className="mb-12">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">
            Welcome back <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">TechVision</span>
          </h1>
          <p className="text-slate-500 mt-2 text-lg">What would you like to handle first today?</p>
        </header>

        {/* Action Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {menuItems.map((item) => (
            <Link 
              key={item.path} 
              to={item.path} 
              className="group relative p-8 bg-white border border-slate-100 rounded-[2rem] shadow-sm hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 hover:-translate-y-2"
            >
              {/* Corner Icon */}
              <div className="absolute top-6 right-6 text-slate-300 group-hover:text-slate-900 group-hover:rotate-45 transition-all">
                <ArrowUpRight size={20} />
              </div>

              {/* Icon Circle */}
              <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-6 transition-all duration-300 ${colorVariants[item.color]}`}>
                <item.icon size={28} />
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-slate-900 mb-2 leading-tight">
                {item.label}
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                {item.description}
              </p>

              {/* Bottom Decorative Element */}
              <div className="mt-6 w-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full transition-all duration-500 rounded-full" />
            </Link>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}