import { auth } from "@/auth";

export default auth((req) => {
});

export const config = {
  matcher: ["/dashboard/:path*"], // Adjust this pattern to match your protected routes
};
