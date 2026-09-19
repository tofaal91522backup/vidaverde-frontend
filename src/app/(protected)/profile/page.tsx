import ProfileIndex from "@/features/protected/pages/profile";
import { NoTranslateDocument } from "@/components/shared/no-translate-document";

const page = () => {
  return (
    <div>
      <NoTranslateDocument />
      <ProfileIndex />
    </div>
  );
};

export default page;
