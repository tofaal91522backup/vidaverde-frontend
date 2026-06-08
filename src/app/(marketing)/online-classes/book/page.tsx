import { Suspense } from "react";
import BookRoute from "@/features/marketing/pages/book";
import { Spinner } from "@/components/ui/spinner";

export const metadata = {
  title: "Book Your Spanish Lesson | Vida Verde",
  description:
    "Book your first one-on-one Spanish lesson with a Vida Verde teacher. Assessment + first lesson from $12. Choose your teacher, pick a time, pay securely.",
};

export default function OnlineClassesBookPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <Spinner className="w-16 h-16 text-vv-green" />
          Loading...
        </div>
      }
    >
      <BookRoute />
    </Suspense>
  );
}
