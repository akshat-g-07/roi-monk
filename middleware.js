import { NextResponse } from "next/server";
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)",
  "/create-new(.*)",
  "/feedback(.*)",
  "/portfolio(.*)",
  "/settings(.*)",
  "/support(.*)",
  "/payment(.*)",
  "/actions(.*)",
  "/data(.*)",
  "/lib(.*)",
]);
const isAdminRoute = createRouteMatcher(["/code(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  const url = req.nextUrl.clone();

  if (
    isAdminRoute(req) &&
    (await auth()).sessionClaims?.metadata?.role !== "admin"
  ) {
    const url = new URL("/", req.url);
    return NextResponse.redirect(url);
  }

  const refVal = url.searchParams?.get("ref");

  if (refVal) {
    url.searchParams.delete("ref");
    const response = NextResponse.redirect(url);
    response.cookies.set("refVal", refVal, {
      httpOnly: false,
      sameSite: "lax",
      maxAge: 15 * 60 * 1000,
    });
    return response;
  }

  if (isProtectedRoute(req)) auth().protect();
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
