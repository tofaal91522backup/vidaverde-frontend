"use client";

import { FormFieldWrapper } from "@/components/shared/form-related/form-field-wrapper";
import RichTextEditorField from "@/components/shared/form-related/RichTextEditor";
import SingleFileUploader from "@/components/shared/form-related/single-file-uploader";
import { SubmitButton } from "@/components/shared/form-related/submit-button";
import { SubmitErrorSummary } from "@/components/shared/form-related/submit-error-summary";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useZodTanstackForm } from "@/hooks/use-zod-tanstack-form";
import { useRouter } from "next/navigation";
import { BlogFormValues, BlogSchema } from "../schemas/blog.schema";

const CATEGORIES = [
  "Language Tips",
  "Culture",
  "Student Stories",
  "Travel",
  "Grammar",
  "Vocabulary",
  "School News",
  "Other",
];

interface BlogFormProps {
  mutation: any;
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
      title: "",
      content: "",
      excerpt: "",
      image: "",
      category: "",
      status: "draft",
      ...defaultValues,
    },
    fieldLabels: {
      title: "Title",
      content: "Content",
      excerpt: "Excerpt",
      image: "Cover Image",
      category: "Category",
      status: "Status",
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
      className="space-y-6"
    >
      <SubmitErrorSummary errors={submitErrors} />

      <div className="grid gap-5 sm:grid-cols-2">
        <form.Field name="title">
          {(field) => (
            <FormFieldWrapper<string> field={field} label="Title">
              {(p) => (
                <Input {...p.inputProps} placeholder="Post title..." />
              )}
            </FormFieldWrapper>
          )}
        </form.Field>

        <form.Field name="category">
          {(field) => (
            <FormFieldWrapper<string> field={field} label="Category">
              {(p) => (
                <Select
                  value={p.inputProps.value}
                  onValueChange={p.onChangeValue}
                >
                  <SelectTrigger id={p.inputProps.id} aria-invalid={p.inputProps["aria-invalid"]}>
                    <SelectValue placeholder="Select category..." />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map((c) => (
                      <SelectItem key={c} value={c}>{c}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </FormFieldWrapper>
          )}
        </form.Field>
      </div>

      <form.Field name="excerpt">
        {(field) => (
          <FormFieldWrapper<string> field={field} label="Excerpt (optional)">
            {(p) => (
              <Textarea
                id={p.inputProps.id}
                name={p.inputProps.name}
                value={p.inputProps.value}
                onBlur={p.inputProps.onBlur}
                onChange={(e) => p.onChangeValue(e.target.value)}
                aria-invalid={p.inputProps["aria-invalid"]}
                placeholder="Short summary shown in the blog list..."
                rows={2}
              />
            )}
          </FormFieldWrapper>
        )}
      </form.Field>

      <form.Field name="content">
        {(field) => (
          <FormFieldWrapper<string> field={field} label="Content">
            {(p) => (
              <RichTextEditorField
                value={p.inputProps.value}
                onChange={p.onChangeValue}
                placeholder="Write the full blog content here..."
              />
            )}
          </FormFieldWrapper>
        )}
      </form.Field>

      <form.Field name="image">
        {(field) => (
          <div className="flex flex-col gap-1.5">
            <Label>Cover Image</Label>
            <SingleFileUploader
              label=""
              value={field.state.value}
              onChange={field.handleChange}
            />
          </div>
        )}
      </form.Field>

      <div className="flex items-center justify-between pt-2">
        <form.Field name="status">
          {(field) => (
            <div className="flex items-center gap-3">
              <Label>Save as:</Label>
              <Select
                value={field.state.value}
                onValueChange={(v) => field.handleChange(v as "draft" | "published")}
              >
                <SelectTrigger className="w-36">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        </form.Field>

        <SubmitButton isLoading={mutation.isPending}>Save Post</SubmitButton>
      </div>
    </form>
  );
}
