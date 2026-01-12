import { Building2, CheckCircle2 } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { mockCompanyProfile } from '@/data/mockData';

export function ProfileCompletionCard() {
  const { legalName, profileCompletion } = mockCompanyProfile;

  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
      <div className="flex items-start gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary">
          <Building2 className="h-7 w-7 text-primary-foreground" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-card-foreground">{legalName}</h3>
          <p className="text-sm text-muted-foreground">Your company profile</p>
        </div>
      </div>

      <div className="mt-6">
        <div className="flex items-center justify-between text-sm">
          <span className="font-medium text-card-foreground">Profile Completion</span>
          <span className="font-semibold text-accent">{profileCompletion}%</span>
        </div>
        <Progress value={profileCompletion} className="mt-2 h-2" />
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {profileCompletion >= 80 && (
          <div className="flex items-center gap-1.5 rounded-full bg-success/10 px-3 py-1 text-xs font-medium text-success">
            <CheckCircle2 className="h-3.5 w-3.5" />
            Almost Complete
          </div>
        )}
      </div>
    </div>
  );
}
