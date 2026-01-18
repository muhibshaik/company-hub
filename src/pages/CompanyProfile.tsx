import { useState } from 'react';
import {
  Building2,
  MapPin,
  Phone,
  Gift,
  Image,
  ChevronDown,
  Save,
  X,
  Upload,
  FileText,
  Mail,
  User,
  Pencil,
} from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { cn } from '@/lib/utils';
import { mockCompanyProfile, mockRegistrationDetails } from '@/data/mockData';
import { toast } from '@/hooks/use-toast';

const industries = [
  'Technology',
  'Healthcare',
  'Finance',
  'Education',
  'Manufacturing',
  'Retail',
  'Services',
  'Other',
];

const companySizes = ['1-10', '11-50', '51-200', '201-500', '500+'];
const businessTypes = ['Private', 'Public', 'Startup', 'Non-profit'];
const countries = ['United States', 'Canada', 'United Kingdom', 'Germany', 'France', 'Australia'];
const states = ['California', 'New York', 'Texas', 'Florida', 'Washington', 'Colorado'];

const benefitOptions = [
  'Health Insurance',
  'Flexible Hours',
  'Remote Work',
  'Paid Leave',
  'Dental Insurance',
  'Vision Insurance',
  '401(k)',
  'Stock Options',
  'Professional Development',
  'Gym Membership',
];

interface SectionProps {
  title: string;
  icon: React.ElementType;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

function ProfileSection({ title, icon: Icon, children, defaultOpen = false }: SectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger asChild>
        <button className="flex w-full items-center justify-between rounded-t-xl border border-border bg-card p-4 text-left transition-colors hover:bg-muted/50">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <Icon className="h-5 w-5 text-primary" />
            </div>
            <span className="font-semibold text-card-foreground">{title}</span>
          </div>
          <ChevronDown
            className={cn(
              'h-5 w-5 text-muted-foreground transition-transform duration-200',
              isOpen && 'rotate-180'
            )}
          />
        </button>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="rounded-b-xl border border-t-0 border-border bg-card p-6">
          {children}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}

// Read-only text display component
function ReadOnlyField({ label, value, icon: Icon }: { label: string; value: string; icon?: React.ElementType }) {
  return (
    <div className="space-y-1">
      <Label className="text-muted-foreground text-sm">{label}</Label>
      <div className="flex items-center gap-2">
        {Icon && <Icon className="h-4 w-4 text-muted-foreground" />}
        <span className="text-foreground">{value || '-'}</span>
      </div>
    </div>
  );
}

export default function CompanyProfile() {
  const [profile, setProfile] = useState(mockCompanyProfile);
  const [selectedBenefits, setSelectedBenefits] = useState<string[]>(profile.benefits);
  const [isEditMode, setIsEditMode] = useState(false);

  const handleSave = () => {
    setIsEditMode(false);
    toast({
      title: 'Profile Saved',
      description: 'Your company profile has been updated successfully.',
    });
  };

  const handleCancel = () => {
    setIsEditMode(false);
    setSelectedBenefits(profile.benefits);
  };

  const handleBenefitToggle = (benefit: string) => {
    setSelectedBenefits((prev) =>
      prev.includes(benefit)
        ? prev.filter((b) => b !== benefit)
        : [...prev, benefit]
    );
  };

  return (
    <DashboardLayout>
      <div className="animate-fade-in">
        {/* Page Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">My Company Profile</h1>
            <p className="mt-1 text-muted-foreground">
              Manage your company information and employer branding
            </p>
          </div>
          <div className="flex gap-3">
            {isEditMode ? (
              <>
                <Button variant="outline" onClick={handleCancel}>
                  <X className="mr-2 h-4 w-4" />
                  Cancel
                </Button>
                <Button onClick={handleSave}>
                  <Save className="mr-2 h-4 w-4" />
                  Save Profile
                </Button>
              </>
            ) : (
              <Button onClick={() => setIsEditMode(true)}>
                <Pencil className="mr-2 h-4 w-4" />
                Edit
              </Button>
            )}
          </div>
        </div>

        {/* Profile Sections */}
        <div className="space-y-4">
          {/* Section 0: Registration Details */}
          <ProfileSection title="Registration Details" icon={FileText} defaultOpen={true}>
            <div className="grid gap-6 md:grid-cols-2">
              <ReadOnlyField label="Company Name" value={mockRegistrationDetails.companyName} />
              <ReadOnlyField label="Registered Email" value={mockRegistrationDetails.registeredEmail} icon={Mail} />
              <ReadOnlyField 
                label="Phone Number" 
                value={`${mockRegistrationDetails.countryCode} ${mockRegistrationDetails.phoneNumber}`} 
                icon={Phone} 
              />
              <ReadOnlyField label="Contact Person" value={mockRegistrationDetails.contactPerson} icon={User} />
            </div>
          </ProfileSection>

          {/* Section 1: Company Overview */}
          <ProfileSection title="Company Overview" icon={Building2}>
            <div className="grid gap-6 md:grid-cols-2">
              <ReadOnlyField label="Company Legal Name" value={profile.legalName} />
              
              {isEditMode ? (
                <div className="space-y-2">
                  <Label htmlFor="industry">Industry / Sector</Label>
                  <Select defaultValue={profile.industry}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select industry" />
                    </SelectTrigger>
                    <SelectContent>
                      {industries.map((ind) => (
                        <SelectItem key={ind} value={ind}>
                          {ind}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              ) : (
                <ReadOnlyField label="Industry / Sector" value={profile.industry} />
              )}
              
              {isEditMode ? (
                <div className="space-y-2">
                  <Label htmlFor="companySize">Company Size</Label>
                  <Select defaultValue={profile.companySize}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select size" />
                    </SelectTrigger>
                    <SelectContent>
                      {companySizes.map((size) => (
                        <SelectItem key={size} value={size}>
                          {size} employees
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              ) : (
                <ReadOnlyField label="Company Size" value={`${profile.companySize} employees`} />
              )}
              
              {isEditMode ? (
                <div className="space-y-2">
                  <Label htmlFor="foundedYear">Founded Year</Label>
                  <Input
                    id="foundedYear"
                    type="number"
                    defaultValue={profile.foundedYear}
                    min={1800}
                    max={new Date().getFullYear()}
                  />
                </div>
              ) : (
                <ReadOnlyField label="Founded Year" value={String(profile.foundedYear)} />
              )}
              
              {isEditMode ? (
                <div className="space-y-2">
                  <Label htmlFor="website">Company Website</Label>
                  <Input
                    id="website"
                    type="url"
                    defaultValue={profile.website}
                    placeholder="https://example.com"
                  />
                </div>
              ) : (
                <ReadOnlyField label="Company Website" value={profile.website} />
              )}
              
              {isEditMode ? (
                <div className="space-y-2">
                  <Label htmlFor="businessType">Business Type</Label>
                  <Select defaultValue={profile.businessType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      {businessTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              ) : (
                <ReadOnlyField label="Business Type" value={profile.businessType} />
              )}
            </div>
          </ProfileSection>

          {/* Section 2: Location & Address */}
          <ProfileSection title="Location & Address" icon={MapPin}>
            <div className="grid gap-6 md:grid-cols-2">
              {isEditMode ? (
                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <Select defaultValue={profile.country}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent>
                      {countries.map((country) => (
                        <SelectItem key={country} value={country}>
                          {country}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              ) : (
                <ReadOnlyField label="Country" value={profile.country} />
              )}
              
              {isEditMode ? (
                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Select defaultValue={profile.state}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select state" />
                    </SelectTrigger>
                    <SelectContent>
                      {states.map((state) => (
                        <SelectItem key={state} value={state}>
                          {state}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              ) : (
                <ReadOnlyField label="State" value={profile.state} />
              )}
              
              {isEditMode ? (
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input id="city" defaultValue={profile.city} />
                </div>
              ) : (
                <ReadOnlyField label="City" value={profile.city} />
              )}
              
              {isEditMode ? (
                <div className="space-y-2">
                  <Label htmlFor="postalCode">Postal Code</Label>
                  <Input id="postalCode" defaultValue={profile.postalCode} />
                </div>
              ) : (
                <ReadOnlyField label="Postal Code" value={profile.postalCode} />
              )}
              
              {isEditMode ? (
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="fullAddress">Full Address</Label>
                  <Textarea
                    id="fullAddress"
                    defaultValue={profile.fullAddress}
                    rows={2}
                  />
                </div>
              ) : (
                <div className="md:col-span-2">
                  <ReadOnlyField label="Full Address" value={profile.fullAddress} />
                </div>
              )}
            </div>
          </ProfileSection>

          {/* Section 3: Contact Information */}
          <ProfileSection title="Contact Information" icon={Phone}>
            <div className="grid gap-6 md:grid-cols-2">
              {isEditMode ? (
                <div className="space-y-2">
                  <Label htmlFor="hrContactName">HR / Hiring Contact Name</Label>
                  <Input id="hrContactName" defaultValue={profile.hrContactName} />
                </div>
              ) : (
                <ReadOnlyField label="HR / Hiring Contact Name" value={profile.hrContactName} />
              )}
              
              {isEditMode ? (
                <div className="space-y-2">
                  <Label htmlFor="hrEmail">HR Email</Label>
                  <Input
                    id="hrEmail"
                    type="email"
                    defaultValue={profile.hrEmail}
                  />
                </div>
              ) : (
                <ReadOnlyField label="HR Email" value={profile.hrEmail} />
              )}
              
              {isEditMode ? (
                <div className="space-y-2">
                  <Label htmlFor="hrPhone">HR Phone</Label>
                  <Input id="hrPhone" type="tel" defaultValue={profile.hrPhone} />
                </div>
              ) : (
                <ReadOnlyField label="HR Phone" value={profile.hrPhone} />
              )}
              
              {isEditMode ? (
                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <Input id="department" defaultValue={profile.department} />
                </div>
              ) : (
                <ReadOnlyField label="Department" value={profile.department} />
              )}
            </div>
          </ProfileSection>

          {/* Section 4: Benefits & Culture */}
          <ProfileSection title="Benefits & Culture" icon={Gift}>
            <div className="space-y-6">
              {isEditMode ? (
                <div className="space-y-3">
                  <Label>Benefits (select all that apply)</Label>
                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {benefitOptions.map((benefit) => (
                      <div key={benefit} className="flex items-center space-x-2">
                        <Checkbox
                          id={benefit}
                          checked={selectedBenefits.includes(benefit)}
                          onCheckedChange={() => handleBenefitToggle(benefit)}
                        />
                        <label
                          htmlFor={benefit}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {benefit}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="space-y-1">
                  <Label className="text-muted-foreground text-sm">Benefits</Label>
                  <div className="flex flex-wrap gap-2">
                    {selectedBenefits.length > 0 ? (
                      selectedBenefits.map((benefit) => (
                        <span
                          key={benefit}
                          className="inline-flex items-center rounded-md bg-primary/10 px-2 py-1 text-sm text-primary"
                        >
                          {benefit}
                        </span>
                      ))
                    ) : (
                      <span className="text-muted-foreground">No benefits listed</span>
                    )}
                  </div>
                </div>
              )}
              
              {isEditMode ? (
                <div className="space-y-2">
                  <Label htmlFor="workCulture">Work Culture Description</Label>
                  <Textarea
                    id="workCulture"
                    defaultValue={profile.workCultureDescription}
                    rows={4}
                    placeholder="Describe your company culture, values, and work environment..."
                  />
                </div>
              ) : (
                <ReadOnlyField label="Work Culture Description" value={profile.workCultureDescription} />
              )}
            </div>
          </ProfileSection>

          {/* Section 5: Employer Branding */}
          <ProfileSection title="Employer Branding" icon={Image}>
            <div className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-3">
                  <Label>Company Logo</Label>
                  <div className="flex items-center gap-4">
                    <div className="flex h-20 w-20 items-center justify-center rounded-xl border-2 border-dashed border-border bg-muted">
                      {profile.logoUrl ? (
                        <img
                          src={profile.logoUrl}
                          alt="Company logo"
                          className="h-full w-full rounded-xl object-cover"
                        />
                      ) : (
                        <Building2 className="h-8 w-8 text-muted-foreground" />
                      )}
                    </div>
                    {isEditMode && (
                      <Button variant="outline" size="sm">
                        <Upload className="mr-2 h-4 w-4" />
                        Upload Logo
                      </Button>
                    )}
                  </div>
                </div>
                <div className="space-y-3">
                  <Label>Cover Image / Banner</Label>
                  <div className="flex h-20 w-full items-center justify-center rounded-xl border-2 border-dashed border-border bg-muted">
                    {profile.coverImageUrl ? (
                      <img
                        src={profile.coverImageUrl}
                        alt="Cover"
                        className="h-full w-full rounded-xl object-cover"
                      />
                    ) : (
                      <div className="flex flex-col items-center gap-1 text-muted-foreground">
                        <Image className="h-6 w-6" />
                        <span className="text-xs">No cover image</span>
                      </div>
                    )}
                  </div>
                  {isEditMode && (
                    <Button variant="outline" size="sm" className="w-full">
                      <Upload className="mr-2 h-4 w-4" />
                      Upload Cover Image
                    </Button>
                  )}
                </div>
              </div>
              <div className="grid gap-6 md:grid-cols-2">
                {isEditMode ? (
                  <div className="space-y-2">
                    <Label htmlFor="linkedinUrl">LinkedIn URL</Label>
                    <Input
                      id="linkedinUrl"
                      type="url"
                      defaultValue={profile.linkedinUrl}
                      placeholder="https://linkedin.com/company/..."
                    />
                  </div>
                ) : (
                  <ReadOnlyField label="LinkedIn URL" value={profile.linkedinUrl} />
                )}
                
                {isEditMode ? (
                  <div className="space-y-2">
                    <Label htmlFor="websiteUrl">Website URL</Label>
                    <Input
                      id="websiteUrl"
                      type="url"
                      defaultValue={profile.website}
                      placeholder="https://example.com"
                    />
                  </div>
                ) : (
                  <ReadOnlyField label="Website URL" value={profile.website} />
                )}
              </div>
            </div>
          </ProfileSection>
        </div>
      </div>
    </DashboardLayout>
  );
}