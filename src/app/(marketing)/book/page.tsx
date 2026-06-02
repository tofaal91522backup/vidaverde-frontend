import { Suspense } from "react";
import BookRoute from "@/features/marketing/pages/book";

export const metadata = {
  title: "Book a Spanish Lesson | Vida Verde",
  description:
    "Book your first one-on-one Spanish lesson with a Vida Verde teacher. Assessment + first lesson from $12. Choose your teacher, pick a time, pay securely.",
};

export default function BookPage() {
  return (
    <Suspense>
      <BookRoute />
    </Suspense>
  );
}
