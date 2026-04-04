"use client";

import { useSignIn } from "@clerk/nextjs/legacy";

export default function LoginPage() {
  const { signIn, isLoaded } = useSignIn();

  async function handleGoogle() {
    if (!signIn) return;
    await signIn.authenticateWithRedirect({
      strategy: "oauth_google",
      redirectUrl: `${window.location.origin}/sso-callback`,
      redirectUrlComplete: `${window.location.origin}/dashboard`,
    });
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#FFFFFF] px-4">
      <div className="w-full max-w-[400px] rounded-[14px] border border-[#E2E8F0] bg-[#FFFFFF] px-8 py-10 shadow-sm">
        <div className="mb-8 text-center">
          <div className="font-wordmark text-[22px] font-semibold tracking-[-0.3px] text-[#0F1117]">
            <span>stem</span>
            <span className="text-[#2DD4BF]">LM</span>
          </div>
        </div>
        <button
          type="button"
          disabled={!isLoaded || !signIn}
          onClick={() => void handleGoogle()}
          className="w-full rounded-md bg-[#2DD4BF] px-4 py-3 text-sm font-medium text-[#0F1117] transition-colors duration-150 hover:bg-[#22C9B0] disabled:cursor-not-allowed disabled:opacity-50"
        >
          Continue with Google
        </button>
      </div>
    </main>
  );
}
