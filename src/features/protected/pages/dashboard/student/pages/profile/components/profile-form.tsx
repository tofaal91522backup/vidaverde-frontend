"use client";

import { FormFieldWrapper } from "@/components/shared/form-related/form-field-wrapper";
import { FormSection } from "@/components/shared/form-related/form-section";
import { ReusableSelect } from "@/components/shared/form-related/reusable-select";
import SingleFileUploader from "@/components/shared/form-related/single-file-uploader";
import { SubmitButton } from "@/components/shared/form-related/submit-button";
import { SubmitErrorSummary } from "@/components/shared/form-related/submit-error-summary";
import { Input } from "@/components/ui/input";
import type { StudentProfile } from "@/features/protected/pages/dashboard/student/types/student.types";
import { useZodTanstackForm } from "@/hooks/use-zod-tanstack-form";
import { useMemo } from "react";
import { useUpdateStudentProfile } from "../queries/use-student-profile";
import { SPANISH_LEVEL_OPTIONS } from "@/constants/spanish-levels";
import { Globe2, ShieldCheck, UserRound } from "lucide-react";
import {
  StudentProfileSchema,
  type StudentProfileValues,
} from "../schemas/student-profile.schema";

/** Browser theke IANA zone list. Purono browser hole chhoto fallback. */
function useTimezoneOptions() {
  return useMemo(() => {
    const fallback = [
      "America/Guayaquil",
      "America/New_York",
      "America/Los_Angeles",
      "Europe/London",
      "Europe/Berlin",
      "Europe/Madrid",
      "Asia/Dhaka",
      "UTC",
    ];

    let zones = fallback;
    try {
      const supported = (
        Intl as unknown as { supportedValuesOf?: (key: string) => string[] }
      ).supportedValuesOf?.("timeZone");
      if (supported?.length) zones = supported;
    } catch {
      zones = fallback;
    }

    return zones.map((zone) => ({ value: zone, label: zone }));
  }, []);
}

export function ProfileForm({ profile }: { profile: StudentProfile }) {
  const mutation = useUpdateStudentProfile();
  const timezoneOptions = useTimezoneOptions();

  const { form, submitErrors } = useZodTanstackForm<StudentProfileValues>({
    schema: StudentProfileSchema,
    mutation,
    defaultValues: {
      name: profile.name ?? "",
      country: profile.country ?? "",
      phone_number: profile.phone_number ?? "",
      timezone: profile.timezone ?? "",
      current_spanish_level: profile.current_spanish_level ?? "none",
      profile_img_url: profile.profile_img_url ?? "",
    },
    fieldLabels: {
      name: "Full name",
      country: "Country",
      phone_number: "Phone number",
      timezone: "Timezone",
      current_spanish_level: "Spanish level",
      profile_img_url: "Profile image URL",
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
      className="space-y-5"
    >
      <SubmitErrorSummary errors={submitErrors} />

      <div className="grid items-start gap-5 xl:grid-cols-[minmax(0,1fr)_340px]">
        <div className="space-y-5">
          <FormSection
            title="Your details"
            description="This is the name your teachers see."
            icon={UserRound}
          >
            <div className="space-y-5">
              <form.Field name="profile_img_url">
                {(field) => (
                  <FormFieldWrapper<string> field={field} label="Profile photo">
                    {(p) => (
                      // Upload `/administrator/upload/` e jay — path-e
                      // "administrator" thakleo route ta shob role-er jonno
                      <SingleFileUploader
                        label="Upload photo"
                        value={p.inputProps.value}
                        onChange={(url) => p.onChangeValue(url)}
                        accept="image/*"
                      />
                    )}
                  </FormFieldWrapper>
                )}
              </form.Field>

              <form.Field name="name">
                {(field) => (
                  <FormFieldWrapper<string> field={field} label="Full name">
                    {(p) => <Input {...p.inputProps} placeholder="Your name" />}
                  </FormFieldWrapper>
                )}
              </form.Field>

              <div className="grid gap-5 sm:grid-cols-2">
                <form.Field name="country">
                  {(field) => (
                    <FormFieldWrapper<string> field={field} label="Country">
                      {(p) => (
                        <Input {...p.inputProps} placeholder="e.g. Germany" />
                      )}
                    </FormFieldWrapper>
                  )}
                </form.Field>

                <form.Field name="phone_number">
                  {(field) => (
                    <FormFieldWrapper<string> field={field} label="Phone number">
                      {(p) => (
                        <Input {...p.inputProps} placeholder="+49 170 1234567" />
                      )}
                    </FormFieldWrapper>
                  )}
                </form.Field>
              </div>
            </div>
          </FormSection>

          <FormSection
            title="Account"
            description="Changed by the school, not here."
            icon={ShieldCheck}
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <p className="text-xs text-muted-foreground">Email</p>
                <p className="text-sm font-medium">{profile.email}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Account status</p>
                <p className="text-sm font-medium">
                  {profile.active ? "Active" : "Deactivated"}
                </p>
              </div>
            </div>
          </FormSection>
        </div>

        <div className="space-y-5 xl:sticky xl:top-4">
          <FormSection
            title="Learning"
            /* Timezone ekhane shobcheye guruttopurno field — portal-er **shob**
               class time ei zone-e dekhay, tai description-e bola hoyeche */
            description="Every class time in the portal is shown in your timezone."
            icon={Globe2}
          >
            <div className="space-y-5">
              <form.Field name="timezone">
                {(field) => (
                  <FormFieldWrapper<string> field={field} label="Timezone">
                    {(p) => (
                      <ReusableSelect
                        id={p.inputProps.id}
                        name={p.inputProps.name}
                        value={p.inputProps.value}
                        onBlur={p.inputProps.onBlur}
                        onChange={(e) => p.onChangeValue(e.target.value)}
                        aria-invalid={p.inputProps["aria-invalid"]}
                        options={timezoneOptions}
                        placeholder="Select your timezone"
                      />
                    )}
                  </FormFieldWrapper>
                )}
              </form.Field>

              <form.Field name="current_spanish_level">
                {(field) => (
                  <FormFieldWrapper<
                    StudentProfileValues["current_spanish_level"]
                  >
                    field={field}
                    label="Spanish level"
                  >
                    {(p) => (
                      <ReusableSelect
                        id={p.inputProps.id}
                        name={p.inputProps.name}
                        value={p.inputProps.value}
                        onBlur={p.inputProps.onBlur}
                        onChange={(e) =>
                          p.onChangeValue(
                            e.target
                              .value as StudentProfileValues["current_spanish_level"],
                          )
                        }
                        aria-invalid={p.inputProps["aria-invalid"]}
                        options={SPANISH_LEVEL_OPTIONS}
                        placeholder="Select your level"
                      />
                    )}
                  </FormFieldWrapper>
                )}
              </form.Field>

              <SubmitButton isLoading={mutation.isPending} className="w-full">
                Save changes
              </SubmitButton>
            </div>
          </FormSection>
        </div>
      </div>
    </form>
  );
}
