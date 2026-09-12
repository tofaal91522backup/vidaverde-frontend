import BookClassIndex from "@/features/protected/pages/dashboard/student/pages/book-class";
import { Suspense } from "react";

// useSearchParams() use kora hoy (?package=<id>), tai Suspense boundary lage
export default () => (
  <Suspense>
    <BookClassIndex />
  </Suspense>
);
