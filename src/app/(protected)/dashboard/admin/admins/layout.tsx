import { getSession } from "@/features/auth/utils/session";
import { redirect } from "next/navigation";

/** Protects the list plus create/edit URLs, including direct navigation. */
export default async function AdminAccountsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  if (session?.user.adminRole !== "master") {
    redirect("/dashboard/admin");
  }

  return children;
}
