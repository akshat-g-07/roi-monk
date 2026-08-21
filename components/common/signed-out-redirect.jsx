"use client";

import { RedirectToSignIn, Show } from "@clerk/nextjs";

// Preserves the signed-out experience for client-rendered protected routes:
// redirects to sign-in when client-side auth state becomes signed-out.
export default function SignedOutRedirect({ children }) {
  return (
    <>
      <Show when="signed-in">{children}</Show>
      <Show when="signed-out">
        <RedirectToSignIn />
      </Show>
    </>
  );
}
