import { Users, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { mockApplicants } from '@/data/mockData';
import { cn } from '@/lib/utils';

const statusColors = {
  New: 'bg-info/10 text-info border-info/20',
  Reviewing: 'bg-warning/10 text-warning border-warning/20',
  Shortlisted: 'bg-accent/10 text-accent border-accent/20',
  Rejected: 'bg-destructive/10 text-destructive border-destructive/20',
  Hired: 'bg-success/10 text-success border-success/20',
};

export function RecentApplicantsCard() {
  const recentApplicants = mockApplicants.slice(0, 5);

  return (
    <div className="rounded-2xl border border-border bg-card shadow-soft">
      <div className="flex items-center justify-between border-b border-border p-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
            <Users className="h-5 w-5 text-accent" />
          </div>
          <div>
            <h3 className="font-semibold text-card-foreground">Recent Applicants</h3>
            <p className="text-sm text-muted-foreground">Latest job applications</p>
          </div>
        </div>
        <Button variant="ghost" size="sm" asChild>
          <Link to="/applicants" className="text-accent hover:text-accent">
            View All
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </Button>
      </div>

      <div className="divide-y divide-border">
        {recentApplicants.map((applicant) => (
          <div
            key={applicant.id}
            className="flex items-center justify-between p-4 transition-colors hover:bg-muted/50"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-medium text-primary-foreground">
                {applicant.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <p className="font-medium text-card-foreground">{applicant.name}</p>
                <p className="text-sm text-muted-foreground">{applicant.jobTitle}</p>
              </div>
            </div>
            <Badge
              variant="outline"
              className={cn('text-xs font-medium', statusColors[applicant.status])}
            >
              {applicant.status}
            </Badge>
          </div>
        ))}
      </div>
    </div>
  );
}
