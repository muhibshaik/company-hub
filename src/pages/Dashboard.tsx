import { Briefcase, Users, UserPlus, TrendingUp } from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatCard } from '@/components/dashboard/StatCard';
import { ProfileCompletionCard } from '@/components/dashboard/ProfileCompletionCard';
import { RecentApplicantsCard } from '@/components/dashboard/RecentApplicantsCard';
import { ActiveJobsCard } from '@/components/dashboard/ActiveJobsCard';
import { mockDashboardStats } from '@/data/mockData';

export default function Dashboard() {
  const { totalJobs, activeJobs, totalApplicants, newApplicants } = mockDashboardStats;

  return (
    <DashboardLayout>
      <div className="animate-fade-in">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
          <p className="mt-1 text-muted-foreground">
            Welcome back! Here's an overview of your recruitment activity.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Jobs"
            value={totalJobs}
            icon={Briefcase}
            variant="primary"
            subtitle="Posted by Admin"
          />
          <StatCard
            title="Active Jobs"
            value={activeJobs}
            icon={TrendingUp}
            variant="accent"
            subtitle="Currently hiring"
          />
          <StatCard
            title="Total Applicants"
            value={totalApplicants}
            icon={Users}
            variant="info"
            subtitle="All applications"
          />
          <StatCard
            title="New Applicants"
            value={newApplicants}
            icon={UserPlus}
            variant="success"
            subtitle="Last 7 days"
          />
        </div>

        {/* Content Grid */}
        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <ProfileCompletionCard />
          </div>
          <div className="lg:col-span-2">
            <ActiveJobsCard />
          </div>
        </div>

        <div className="mt-6">
          <RecentApplicantsCard />
        </div>
      </div>
    </DashboardLayout>
  );
}
