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
    <div className="hs-mosaic">
      {images.map((image) => (
        <Image
          key={image.src}
          className={cn(image.className)}
          src={image.src}
          alt={image.alt}
          width={image.className === "a" ? 1200 : 900}
          height={700}
        />
      ))}
    </div>
  );
}
