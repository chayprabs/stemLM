import { SignOutButton } from "@clerk/nextjs";
import { auth, currentUser } from "@clerk/nextjs/server";

export default async function DashboardPage() {
  await auth();
  const user = await currentUser();

  const email =
    user?.primaryEmailAddress?.emailAddress ??
    user?.emailAddresses[0]?.emailAddress ??
    "";
  const name =
    user?.fullName ||
    [user?.firstName, user?.lastName].filter(Boolean).join(" ") ||
    user?.username ||
    "User";

  return (
    <main className="min-h-screen bg-[#FFFFFF] px-4 py-12 sm:px-6">
      <div className="mx-auto w-full max-w-[640px]">
        <h1 className="mb-2 text-2xl font-semibold tracking-[-0.02em] text-[#0F1117]">
          Dashboard — coming soon
        </h1>
        <p className="mb-1 text-[15px] text-[#0F1117]">{name}</p>
        <p className="mb-8 text-[15px] text-[#64748B]">{email}</p>
        <SignOutButton>
          <button
            type="button"
            className="rounded-md border border-[#E2E8F0] bg-[#FFFFFF] px-4 py-2 text-sm font-medium text-[#0F1117] transition-colors duration-150 hover:bg-[#F8F9FC]"
          >
            Sign out
          </button>
        </SignOutButton>
      </div>
    </main>
  );
}
