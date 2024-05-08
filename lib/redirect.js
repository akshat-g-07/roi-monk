"use server";

import { redirect } from "next/navigation";

export async function Redirect(redirectURL) {
  console.log("server", redirectURL);

  redirect(`/${redirectURL}`);
}
