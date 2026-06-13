import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import DashboardPageLayout from "@/features/protected/pages/dashboard/shared/components/dashboard-page-layout";
import {
  CalendarDays,
  Camera,
  CheckCircle2,
  Clock3,
  CreditCard,
  Edit3,
  Globe2,
  GraduationCap,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  UserRound,
} from "lucide-react";

const profile = {
  name: "Sarah Johnson",
  role: "Student",
  avatar: "/images/teachers/1.jpg",
  email: "sarah.johnson@example.com",
  phone: "+1 (415) 555-0198",
  location: "San Francisco, USA",
  timezone: "Pacific Time (GMT-8)",
  languageLevel: "Intermediate Spanish",
  learningGoal: "Travel confidence and everyday conversation",
  preferredTeacher: "Ximena",
  joined: "March 2026",
  nextLesson: "Friday, June 19 at 10:00 AM",
  packageName: "10-Class Package",
  classesRemaining: 7,
};

const learningStats = [
  { label: "Classes completed", value: "18" },
  { label: "Current streak", value: "4 weeks" },
  { label: "Hours learned", value: "27" },
  { label: "Invoices paid", value: "3" },
];

const editableFields = [
  {
    label: "Full name",
    value: profile.name,
    icon: UserRound,
  },
  {
    label: "Email address",
    value: profile.email,
    icon: Mail,
  },
  {
    label: "Phone number",
    value: profile.phone,
    icon: Phone,
  },
  {
    label: "Location",
    value: profile.location,
    icon: MapPin,
  },
  {
    label: "Timezone",
    value: profile.timezone,
    icon: Globe2,
  },
];

const preferences = [
  "Conversation-focused lessons",
  "Homework after each class",
  "Correct mistakes during speaking",
  "Travel vocabulary and Ecuador context",
];

const accountItems = [
  {
    title: "Password",
    description: "Last changed 3 months ago",
    action: "Update",
    icon: ShieldCheck,
  },
  {
    title: "Payment method",
    description: "Visa ending in 4242",
    action: "Manage",
    icon: CreditCard,
  },
  {
    title: "Lesson reminders",
    description: "Email reminders 24 hours before class",
    action: "Edit",
    icon: Clock3,
  },
];

export default function ProfileIndex() {
  return (
    <DashboardPageLayout
      title="My Profile"
      subtitle="View and manage your student profile, learning details, and account settings."
      action={
        <Button>
          <Edit3 data-icon="inline-start" />
          Edit Profile
        </Button>
      }
    >
      <div className="flex flex-col gap-6">
        <Card className="overflow-hidden">
          <div className="h-28 bg-primary/10" />
          <CardContent className="-mt-12 flex flex-col gap-6 p-6 md:flex-row md:items-end md:justify-between">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
              <div className="relative">
                <Avatar className="size-28 border-4 border-background shadow-sm">
                  <AvatarImage src={profile.avatar} alt={profile.name} />
                  <AvatarFallback>SJ</AvatarFallback>
                </Avatar>
                <Button
                  size="icon"
                  variant="secondary"
                  className="absolute bottom-1 right-1 size-9 rounded-full"
                  aria-label="Change profile photo"
                >
                  <Camera data-icon="inline-start" />
                </Button>
              </div>

              <div className="flex flex-col gap-2 pb-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-2xl font-semibold tracking-tight">
                    {profile.name}
                  </h3>
                  <Badge variant="secondary">{profile.role}</Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  {profile.learningGoal}
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge>{profile.languageLevel}</Badge>
                  <Badge variant="outline">Joined {profile.joined}</Badge>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <Button variant="outline">
                <CalendarDays data-icon="inline-start" />
                Schedule Lesson
              </Button>
              <Button variant="outline">
                <ShieldCheck data-icon="inline-start" />
                Account Settings
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {learningStats.map((stat) => (
            <Card key={stat.label}>
              <CardHeader className="pb-2">
                <CardDescription>{stat.label}</CardDescription>
                <CardTitle className="text-2xl">{stat.value}</CardTitle>
              </CardHeader>
            </Card>
          ))}
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>
                Demo contact details shown as editable profile fields.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              {editableFields.map((field) => {
                const Icon = field.icon;

                return (
                  <div
                    key={field.label}
                    className="flex items-center justify-between gap-4 rounded-lg border p-4"
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                        <Icon className="size-5" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-sm font-medium">
                          {field.label}
                        </div>
                        <div className="truncate text-sm text-muted-foreground">
                          {field.value}
                        </div>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      Edit
                    </Button>
                  </div>
                );
              })}
            </CardContent>
          </Card>

          <div className="flex flex-col gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Learning Profile</CardTitle>
                <CardDescription>
                  Preferences your teacher can use to personalise lessons.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                <div className="grid gap-3">
                  <div className="rounded-lg border p-4">
                    <div className="flex items-center gap-2 text-sm font-medium">
                      <GraduationCap className="size-4 text-muted-foreground" />
                      Preferred teacher
                    </div>
                    <div className="mt-1 text-sm text-muted-foreground">
                      {profile.preferredTeacher}
                    </div>
                  </div>
                  <div className="rounded-lg border p-4">
                    <div className="flex items-center gap-2 text-sm font-medium">
                      <CalendarDays className="size-4 text-muted-foreground" />
                      Next lesson
                    </div>
                    <div className="mt-1 text-sm text-muted-foreground">
                      {profile.nextLesson}
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="flex flex-col gap-2">
                  {preferences.map((preference) => (
                    <div
                      key={preference}
                      className="flex items-center gap-2 text-sm"
                    >
                      <CheckCircle2 className="size-4 text-primary" />
                      {preference}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Current Package</CardTitle>
                <CardDescription>
                  Active demo package and remaining lessons.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg border bg-muted/30 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <div className="font-medium">{profile.packageName}</div>
                      <div className="text-sm text-muted-foreground">
                        {profile.classesRemaining} classes remaining
                      </div>
                    </div>
                    <Badge variant="secondary">Active</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Edit Profile & Account</CardTitle>
            <CardDescription>
              Quick access to profile-related settings and account actions.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-3">
            {accountItems.map((item) => {
              const Icon = item.icon;

              return (
                <div key={item.title} className="rounded-lg border p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex min-w-0 gap-3">
                      <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                        <Icon className="size-5" />
                      </div>
                      <div>
                        <div className="font-medium">{item.title}</div>
                        <div className="mt-1 text-sm text-muted-foreground">
                          {item.description}
                        </div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      {item.action}
                    </Button>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>
    </DashboardPageLayout>
  );
}
