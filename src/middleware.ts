import { authMiddleware, redirectToSignIn } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { getProfileByUserId } from "./services/profiles.service";

export default authMiddleware({
  publicRoutes: ["/api/:path*"],
  async afterAuth(auth, req, evt) {
    if (!auth.userId && !auth.isPublicRoute) {
      return redirectToSignIn({ returnBackUrl: req.url });
    }

    if (
      auth.userId &&
      !auth.isPublicRoute &&
      req.nextUrl.pathname !== "/create-profile"
    ) {
      const existProfile = await getProfileByUserId(auth.userId);
      if (!existProfile) {
        return NextResponse.redirect(new URL("/create-profile", req.url));
      }
    }
  },
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
