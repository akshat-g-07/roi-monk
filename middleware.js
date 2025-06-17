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

export default clerkMiddleware(async (auth, req) => {
  const url = req.nextUrl.clone();

  const refVal = url.searchParams?.get("ref");

  if (refVal) {
    url.searchParams.delete("ref");
    const response = NextResponse.redirect(url);
    const refCookie = refVal === "rec" ? "rec" : "oth";
    response.cookies.set("ref", refCookie, {
      expires: new Date("9999-12-31T23:59:59.000Z"),
    });

    if (refVal !== "rec") {
      const REF_SERVICE = process.env.REF_SERVICE;
      const refUrl = new URL(REF_SERVICE);
      refUrl.searchParams.set("ref", refVal);
      fetch(refUrl);
    }

    return response;
  }

  if (isProtectedRoute(req)) auth().protect();
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
