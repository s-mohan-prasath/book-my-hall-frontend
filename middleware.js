import { NextResponse } from "next/server";

export async function middleware(request) {
    const adminPages = ["/admin",]; // Admin-only pages
    const userPages = ["/venue", "/venueList", "/profile"]; // User-only pages
    const { pathname } = request.nextUrl;

    const adminAuthToken = request.cookies.get("admin_auth_token"); // Admin token
    const userAuthToken = request.cookies.get("auth_token"); // Normal user token

    try {
        // Admin Route Validation
        if (adminPages.includes(pathname)) {
            if (!adminAuthToken) {
                const loginUrl = new URL("/adminLogin", request.url); // Redirect to admin login
                return NextResponse.redirect(loginUrl);
            }

            // Verify Admin Token
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/verify-token?token=${adminAuthToken.value}`);

            if (response.status !== 200) {
                const notAuthorizedUrl = new URL("/not-authorized", request.url); // Redirect unauthorized users
                return NextResponse.redirect(notAuthorizedUrl);
            }
        }

        // User Route Validation
        if (userPages.includes(pathname)) {
            if (!userAuthToken) {
                const loginUrl = new URL("/login", request.url); // Redirect to normal login
                return NextResponse.redirect(loginUrl);
            }

            // Verify User Token
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/verify-token?token=${userAuthToken.value}`);

            if (response.status !== 200) {
                const notAuthorizedUrl = new URL("/not-authorized", request.url); // Redirect unauthorized users
                return NextResponse.redirect(notAuthorizedUrl);
            }
        }
    } catch (error) {
        console.error("Error in middleware:", error);

        const errorUrl = new URL("/error", request.url); // Redirect to a generic error page
        return NextResponse.redirect(errorUrl);
    }

    return NextResponse.next(); // Allow request to proceed if authenticated
}
