import { Briefcase, ArrowRight, MapPin, Users as UsersIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { mockJobs } from '@/data/mockData';
import { cn } from '@/lib/utils';

const statusColors = {
  Active: 'bg-success/10 text-success border-success/20',
  Closed: 'bg-muted text-muted-foreground border-border',
  Draft: 'bg-warning/10 text-warning border-warning/20',
};

export function ActiveJobsCard() {
  const activeJobs = mockJobs.filter(j => j.status === 'Active').slice(0, 3);

  return (
    <div className="rounded-2xl border border-border bg-card shadow-soft">
      <div className="flex items-center justify-between border-b border-border p-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <Briefcase className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-card-foreground">Active Jobs</h3>
            <p className="text-sm text-muted-foreground">Jobs currently accepting applications</p>
          </div>
        </div>
        <Button variant="ghost" size="sm" asChild>
          <Link to="/jobs" className="text-primary hover:text-primary">
            View All
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </Button>
      </div>

      <div className="divide-y divide-border">
        {activeJobs.map((job) => (
          <div
            key={job.id}
            className="p-4 transition-colors hover:bg-muted/50"
          >
            <div className="flex items-start justify-between">
              <div>
                <h4 className="font-medium text-card-foreground">{job.title}</h4>
                <div className="mt-1 flex items-center gap-3 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5" />
                    {job.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <UsersIcon className="h-3.5 w-3.5" />
                    {job.applicantCount} applicants
                  </span>
                </div>
              </div>
              <Badge
                variant="outline"
                className={cn('text-xs font-medium', statusColors[job.status])}
              >
                {job.status}
              </Badge>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
