import { cn } from "@/lib/utils";
import Image from "next/image";

type GalleryImage = {
  src: string;
  alt: string;
  className?: string;
};

type GallerySectionProps = {
  images: GalleryImage[];
};

export function GallerySection({ images }: GallerySectionProps) {
  return (
    <div className="mt-8 grid grid-cols-2 gap-4 max-[640px]:grid-cols-1">
      {images.map((image) => (
        <Image
          key={image.src}
          className={cn(
            "w-full rounded-2xl object-cover border border-vv-line shadow-[0_18px_45px_rgba(7,14,10,0.08)]",
            image.className === "a"
              ? "col-span-2 aspect-video max-[640px]:col-span-1"
              : "aspect-4/3",
          )}
          src={image.src}
          alt={image.alt}
          width={image.className === "a" ? 1200 : 900}
          height={700}
          unoptimized
        />
      ))}
    </div>
  );
}
