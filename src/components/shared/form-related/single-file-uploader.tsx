"use client";

import { Button } from "@/components/ui/button";
import { uploadSingleFile } from "@/services/upload-file.service";
import { ImageIcon, Trash2, Upload, UserRound } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";

type Props = {
  label?: string;
  /** Uploaded URL */
  value?: string;
  onChange: (url: string) => void;
  accept?: string;
  disabled?: boolean;
  /**
   * `banner` — blog cover, package/teacher chhobi. Chowra preview.
   * `avatar` — profile photo. Gol, chhoto, pashe button.
   *
   * Ek-i banner preview shob jaygay use korle profile photo-r jonno ekta
   * 160px lomba patti uthto, ja avatar-er moto dekhay-o na ar form-ta
   * ghumiye dey.
   */
  variant?: "banner" | "avatar";
};

export default function SingleFileUploader({
  label,
  value,
  onChange,
  accept = "image/*",
  disabled,
  variant = "banner",
}: Props) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleFile = async (file: File | null) => {
    if (!file) return;

    try {
      setUploading(true);
      onChange(await uploadSingleFile(file));
    } catch (error) {
      // Age `alert()` chilo — project-er baki shob jaygay Sonner toast
      toast.error(
        error instanceof Error ? error.message : "Could not upload the file.",
        { icon: "❌", position: "top-center" },
      );
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  const pickButton = (
    <Button
      type="button"
      variant="outline"
      size={variant === "avatar" ? "sm" : "default"}
      onClick={() => inputRef.current?.click()}
      disabled={disabled || uploading}
      className="gap-2"
    >
      <Upload className="h-4 w-4" />
      {uploading ? "Uploading…" : value ? "Change" : "Upload"}
    </Button>
  );

  const removeButton = value ? (
    <Button
      type="button"
      variant="ghost"
      size={variant === "avatar" ? "sm" : "default"}
      onClick={() => onChange("")}
      disabled={disabled || uploading}
      className="gap-2 text-destructive hover:bg-destructive/10 hover:text-destructive"
    >
      <Trash2 className="h-4 w-4" />
      Remove
    </Button>
  ) : null;

  const fileInput = (
    <input
      ref={inputRef}
      type="file"
      accept={accept}
      className="hidden"
      onChange={(e) => handleFile(e.target.files?.[0] ?? null)}
      disabled={disabled || uploading}
    />
  );

  if (variant === "avatar") {
    return (
      <div className="flex items-center gap-4">
        {fileInput}

        <div className="grid size-16 shrink-0 place-items-center overflow-hidden rounded-full border bg-muted text-muted-foreground">
          {value ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={value}
              alt=""
              className="size-full object-cover"
            />
          ) : (
            <UserRound className="size-6" />
          )}
        </div>

        <div className="flex min-w-0 flex-wrap items-center gap-1.5">
          {pickButton}
          {removeButton}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {label ? <p className="text-sm font-medium">{label}</p> : null}

      {fileInput}

      {value ? (
        <div className="space-y-2">
          <div className="overflow-hidden rounded-lg border bg-muted">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={value}
              alt=""
              className="h-40 w-full max-w-sm object-cover"
            />
          </div>
          <div className="flex flex-wrap items-center gap-1.5">
            {pickButton}
            {removeButton}
          </div>
        </div>
      ) : (
        <div className="flex flex-wrap items-center gap-3">
          <div className="grid size-10 shrink-0 place-items-center rounded-lg border bg-muted text-muted-foreground">
            <ImageIcon className="size-4" />
          </div>
          {pickButton}
        </div>
      )}
    </div>
  );
}
