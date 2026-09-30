import ProfileIndex from "@/features/protected/pages/profile";
import { GoogleTranslate } from "@/components/shared/google-translate";

const page = () => {
  return (
    <div>
      {/* Dashboard-er moto-i onubad hoy. Ei page-ta shell-er bahire, tai nijer
          widget lage. Curtain nai — dashboard-er shathe ek-i achoron. */}
      <GoogleTranslate curtain={false} />
      <ProfileIndex />
    </div>
  );
};

export default page;
