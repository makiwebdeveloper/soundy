import { authMiddleware, redirectToSignIn } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { findProfileByUserId } from "./services/profiles.service";

export default authMiddleware({
  publicRoutes: ["/api/uploadthing"],
  async afterAuth(auth, req, evt) {
    if (!auth.userId && !auth.isPublicRoute) {
      return redirectToSignIn({ returnBackUrl: req.url });
    }

    if (
      auth.userId &&
      !auth.isPublicRoute &&
      req.nextUrl.pathname !== "/create-profile"
    ) {
      const existProfile = await findProfileByUserId(auth.userId);
      if (!existProfile) {
        return NextResponse.redirect(new URL("/create-profile", req.url));
      }
    }
  },
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
