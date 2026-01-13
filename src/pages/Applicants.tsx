import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Users,
  Eye,
  Mail,
  Phone,
  Calendar,
  Search,
  Filter,
  Lock,
} from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { mockApplicants, mockJobs } from '@/data/mockData';
import { Applicant } from '@/types/company';


const statusColors = {
  New: 'bg-info/10 text-info border-info/20',
  Reviewing: 'bg-warning/10 text-warning border-warning/20',
  Shortlisted: 'bg-accent/10 text-accent border-accent/20',
  Rejected: 'bg-destructive/10 text-destructive border-destructive/20',
  Hired: 'bg-success/10 text-success border-success/20',
};

export default function Applicants() {
  const [searchParams] = useSearchParams();
  const initialJobId = searchParams.get('job') || 'all';

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedJobId, setSelectedJobId] = useState(initialJobId);
  const [selectedApplicant, setSelectedApplicant] = useState<Applicant | null>(null);

  const filteredApplicants = mockApplicants.filter((applicant) => {
    const matchesSearch =
      applicant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      applicant.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesJob = selectedJobId === 'all' || applicant.jobId === selectedJobId;
    return matchesSearch && matchesJob;
  });


  return (
    <DashboardLayout>
      <div className="animate-fade-in">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground">Applicants</h1>
          <p className="mt-1 text-muted-foreground">
            View and manage job applicants for your company positions
          </p>
        </div>

        {/* Filters */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search applicants..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <Select value={selectedJobId} onValueChange={setSelectedJobId}>
              <SelectTrigger className="w-[240px]">
                <SelectValue placeholder="Filter by job" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Jobs</SelectItem>
                {mockJobs.map((job) => (
                  <SelectItem key={job.id} value={job.id}>
                    {job.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Applicants Table */}
        <div className="rounded-2xl border border-border bg-card shadow-soft overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="font-semibold">Candidate</TableHead>
                <TableHead className="font-semibold">Applied For</TableHead>
                <TableHead className="font-semibold">Status</TableHead>
                <TableHead className="font-semibold">Applied Date</TableHead>
                <TableHead className="font-semibold text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredApplicants.map((applicant) => (
                <TableRow key={applicant.id} className="hover:bg-muted/30">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-medium text-primary-foreground">
                        {applicant.name
                          .split(' ')
                          .map((n) => n[0])
                          .join('')}
                      </div>
                      <div>
                        <p className="font-medium">{applicant.name}</p>
                        <p className="text-sm text-muted-foreground">{applicant.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-muted-foreground">{applicant.jobTitle}</span>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={cn('font-medium', statusColors[applicant.status])}
                    >
                      {applicant.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1.5 text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      {applicant.appliedDate}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedApplicant(applicant)}
                    >
                      <Eye className="mr-1 h-4 w-4" />
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {filteredApplicants.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Users className="h-12 w-12 text-muted-foreground/50" />
              <h3 className="mt-4 text-lg font-semibold">No applicants found</h3>
              <p className="mt-1 text-muted-foreground">
                Try adjusting your search or filter criteria
              </p>
            </div>
          )}
        </div>

        {/* Permission Notice */}
        <div className="mt-6 rounded-xl border border-border bg-muted/50 p-4">
          <div className="flex items-start gap-3">
            <Lock className="mt-0.5 h-5 w-5 text-muted-foreground" />
            <div>
              <p className="font-medium text-foreground">View-Only Access</p>
              <p className="text-sm text-muted-foreground">
                As an employer, you can view applicant profiles but cannot
                change application status. Contact the platform administrator for status updates.
              </p>
            </div>
          </div>
        </div>

        {/* Applicant Details Dialog */}
        <Dialog open={!!selectedApplicant} onOpenChange={() => setSelectedApplicant(null)}>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Candidate Profile</DialogTitle>
              <DialogDescription>Applicant details and contact information</DialogDescription>
            </DialogHeader>
            {selectedApplicant && (
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-lg font-semibold text-primary-foreground">
                    {selectedApplicant.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">{selectedApplicant.name}</h3>
                    <p className="text-muted-foreground">
                      Applied for {selectedApplicant.jobTitle}
                    </p>
                  </div>
                </div>

                <div className="grid gap-4">
                  <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span>{selectedApplicant.email}</span>
                  </div>
                  {selectedApplicant.phone && (
                    <div className="flex items-center gap-3">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span>{selectedApplicant.phone}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-3">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>Applied on {selectedApplicant.appliedDate}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 rounded-lg bg-muted p-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Status</p>
                    <Badge
                      variant="outline"
                      className={cn('mt-1', statusColors[selectedApplicant.status])}
                    >
                      {selectedApplicant.status}
                    </Badge>
                  </div>
                  {selectedApplicant.experience && (
                    <div>
                      <p className="text-sm text-muted-foreground">Experience</p>
                      <p className="font-medium">{selectedApplicant.experience}</p>
                    </div>
                  )}
                </div>

                <div className="flex justify-end pt-2">
                  <Button variant="outline" onClick={() => setSelectedApplicant(null)}>
                    Close
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
}
