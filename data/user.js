import { currentUser } from "@clerk/nextjs/server";

export async function getUserEmail() {
  const user = await currentUser();
  if (!user) return null;
  const userEmail = user.emailAddresses[0].emailAddress;
  return userEmail;
}

export async function getUserName() {
  const user = await currentUser();
  return user?.firstName + " " + user?.lastName;
}
