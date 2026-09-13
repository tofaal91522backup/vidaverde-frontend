"use client";

import { FormFieldWrapper } from "@/components/shared/form-related/form-field-wrapper";
import { FormSection } from "@/components/shared/form-related/form-section";
import MultiFileUploader from "@/components/shared/form-related/multi-file-uploader";
import { ReusableSelect } from "@/components/shared/form-related/reusable-select";
import RichTextEditorField from "@/components/shared/form-related/RichTextEditor";
import { SubmitButton } from "@/components/shared/form-related/submit-button";
import { SubmitErrorSummary } from "@/components/shared/form-related/submit-error-summary";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  useZodTanstackForm,
  type AnyMutationLike,
} from "@/hooks/use-zod-tanstack-form";
import { FileText, Image as ImageIcon, Search, Settings2 } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  BLOG_CATEGORIES,
  BLOG_STATUSES,
  BlogSchema,
  type BlogFormValues,
} from "../schemas/blog.schema";

interface BlogFormProps {
  mutation: AnyMutationLike<BlogFormValues>;
  defaultValues?: Partial<BlogFormValues>;
  redirectTo?: string;
}

export function BlogForm({
  mutation,
  defaultValues,
  redirectTo = "/dashboard/admin/blogs",
}: BlogFormProps) {
  const router = useRouter();

  const { form, submitErrors } = useZodTanstackForm<BlogFormValues>({
    schema: BlogSchema,
    mutation,
    defaultValues: {
      title_en: "",
      title_es: "",
      slug: "",
      excerpt_en: "",
      excerpt_es: "",
      body_en: "",
      body_es: "",
      image_urls: [],
      category: "school_news",
      status: "draft",
      meta_title: "",
      meta_description: "",
      ...defaultValues,
    },
    fieldLabels: {
      title_en: "Title (English)",
      title_es: "Title (Spanish)",
      slug: "Slug",
      excerpt_en: "Excerpt (English)",
      excerpt_es: "Excerpt (Spanish)",
      body_en: "Body (English)",
      body_es: "Body (Spanish)",
      image_urls: "Images",
      category: "Category",
      status: "Status",
      meta_title: "Meta title",
      meta_description: "Meta description",
    },
    onValidSubmit: () => {
      router.push(redirectTo);
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

      {/*
        Do column: bam-e lekhar kaj, dan-e publish/SEO settings.
        Age 12 ta field ek lamba stack chilo — Save button-e pouchate duita
        rich-text editor perote hoto. Ekhon settings ar Save dan pashe
        sticky, tai editor koto lomba tar upor nirbhor kore na.
      */}
      <div className="grid items-start gap-5 xl:grid-cols-[minmax(0,1fr)_340px]">
        <div className="space-y-5">
          <FormSection
            title="Content"
            description="Spanish is optional everywhere — blank falls back to English."
            icon={FileText}
          >
            <div className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <form.Field name="title_en">
                  {(field) => (
                    <FormFieldWrapper<string>
                      field={field}
                      label="Title (English)"
                    >
                      {(p) => (
                        <Input {...p.inputProps} placeholder="Post title" />
                      )}
                    </FormFieldWrapper>
                  )}
                </form.Field>

                <form.Field name="title_es">
                  {(field) => (
                    <FormFieldWrapper<string>
                      field={field}
                      label="Title (Spanish)"
                    >
                      {(p) => (
                        <Input
                          {...p.inputProps}
                          placeholder="Leave blank to fall back to English"
                        />
                      )}
                    </FormFieldWrapper>
                  )}
                </form.Field>
              </div>

              <form.Field name="slug">
                {(field) => (
                  <FormFieldWrapper<string> field={field} label="Slug">
                    {(p) => (
                      <Input
                        {...p.inputProps}
                        placeholder="Auto-generated from the title"
                      />
                    )}
                  </FormFieldWrapper>
                )}
              </form.Field>

              <div className="grid gap-5 lg:grid-cols-2">
                <form.Field name="excerpt_en">
                  {(field) => (
                    <FormFieldWrapper<string>
                      field={field}
                      label="Excerpt (English)"
                    >
                      {(p) => (
                        <Textarea
                          id={p.inputProps.id}
                          name={p.inputProps.name}
                          value={p.inputProps.value}
                          onBlur={p.inputProps.onBlur}
                          onChange={(e) => p.onChangeValue(e.target.value)}
                          aria-invalid={p.inputProps["aria-invalid"]}
                          rows={3}
                          placeholder="1-2 sentence teaser on the index card"
                        />
                      )}
                    </FormFieldWrapper>
                  )}
                </form.Field>

                <form.Field name="excerpt_es">
                  {(field) => (
                    <FormFieldWrapper<string>
                      field={field}
                      label="Excerpt (Spanish)"
                    >
                      {(p) => (
                        <Textarea
                          id={p.inputProps.id}
                          name={p.inputProps.name}
                          value={p.inputProps.value}
                          onBlur={p.inputProps.onBlur}
                          onChange={(e) => p.onChangeValue(e.target.value)}
                          aria-invalid={p.inputProps["aria-invalid"]}
                          rows={3}
                        />
                      )}
                    </FormFieldWrapper>
                  )}
                </form.Field>
              </div>
            </div>
          </FormSection>

          <FormSection
            title="Body"
            description="The article itself. Rendered as HTML on the public site."
            icon={FileText}
          >
            <div className="space-y-6">
              <form.Field name="body_en">
                {(field) => (
                  <FormFieldWrapper<string> field={field} label="English">
                    {(p) => (
                      <RichTextEditorField
                        value={p.inputProps.value}
                        onChange={p.onChangeValue}
                      />
                    )}
                  </FormFieldWrapper>
                )}
              </form.Field>

              <form.Field name="body_es">
                {(field) => (
                  <FormFieldWrapper<string> field={field} label="Spanish">
                    {(p) => (
                      <RichTextEditorField
                        value={p.inputProps.value}
                        onChange={p.onChangeValue}
                      />
                    )}
                  </FormFieldWrapper>
                )}
              </form.Field>
            </div>
          </FormSection>

          <FormSection
            title="Images"
            description="The first image becomes the thumbnail on the blog index."
            icon={ImageIcon}
          >
            <form.Field name="image_urls">
              {(field) => (
                <div className="flex flex-col gap-1.5">
                  <Label className="sr-only">Images</Label>
                  <MultiFileUploader
                    label="Upload images"
                    value={field.state.value ?? []}
                    onChange={field.handleChange}
                  />
                </div>
              )}
            </form.Field>
          </FormSection>
        </div>

        <div className="space-y-5 xl:sticky xl:top-4">
          <FormSection
            title="Publishing"
            description="Drafts stay hidden from the public site."
            icon={Settings2}
          >
            <div className="space-y-5">
              <form.Field name="status">
                {(field) => (
                  <FormFieldWrapper<BlogFormValues["status"]>
                    field={field}
                    label="Status"
                  >
                    {(p) => (
                      <ReusableSelect
                        id={p.inputProps.id}
                        name={p.inputProps.name}
                        value={p.inputProps.value}
                        onBlur={p.inputProps.onBlur}
                        onChange={(e) =>
                          p.onChangeValue(
                            e.target.value as BlogFormValues["status"],
                          )
                        }
                        aria-invalid={p.inputProps["aria-invalid"]}
                        options={BLOG_STATUSES}
                        placeholder="Select a status"
                      />
                    )}
                  </FormFieldWrapper>
                )}
              </form.Field>

              <form.Field name="category">
                {(field) => (
                  <FormFieldWrapper<BlogFormValues["category"]>
                    field={field}
                    label="Category"
                  >
                    {(p) => (
                      <ReusableSelect
                        id={p.inputProps.id}
                        name={p.inputProps.name}
                        value={p.inputProps.value}
                        onBlur={p.inputProps.onBlur}
                        onChange={(e) =>
                          p.onChangeValue(
                            e.target.value as BlogFormValues["category"],
                          )
                        }
                        aria-invalid={p.inputProps["aria-invalid"]}
                        options={BLOG_CATEGORIES}
                        placeholder="Select a category"
                      />
                    )}
                  </FormFieldWrapper>
                )}
              </form.Field>

              <SubmitButton isLoading={mutation.isPending} className="w-full">
                Save post
              </SubmitButton>
            </div>
          </FormSection>

          <FormSection
            title="SEO"
            description="Used in <head>. Falls back to the title and excerpt."
            icon={Search}
          >
            <div className="space-y-5">
              <form.Field name="meta_title">
                {(field) => (
                  <FormFieldWrapper<string> field={field} label="Meta title">
                    {(p) => (
                      <Input {...p.inputProps} placeholder="SEO title" />
                    )}
                  </FormFieldWrapper>
                )}
              </form.Field>

              <form.Field name="meta_description">
                {(field) => (
                  <FormFieldWrapper<string>
                    field={field}
                    label="Meta description"
                  >
                    {(p) => (
                      <Textarea
                        id={p.inputProps.id}
                        name={p.inputProps.name}
                        value={p.inputProps.value}
                        onBlur={p.inputProps.onBlur}
                        onChange={(e) => p.onChangeValue(e.target.value)}
                        aria-invalid={p.inputProps["aria-invalid"]}
                        rows={3}
                        placeholder="SEO description"
                      />
                    )}
                  </FormFieldWrapper>
                )}
              </form.Field>
            </div>
          </FormSection>
        </div>
      </div>
    </form>
  );
}
