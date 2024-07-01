import { currentUser } from "@clerk/nextjs/server";

export async function getUserEmail() {
  const user = await currentUser();
  const userEmail = user.emailAddresses[0].emailAddress;
  return userEmail;
}
