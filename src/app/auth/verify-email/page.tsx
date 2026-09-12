import VerifyEmailIndex from "@/features/auth/pages/verify-email";

const Page = async ({
  searchParams,
}: {
  searchParams: Promise<{ email?: string }>;
}) => {
  const { email } = await searchParams;

  return <VerifyEmailIndex email={email} />;
};

export default Page;
