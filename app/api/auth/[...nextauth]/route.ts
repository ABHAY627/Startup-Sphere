import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";

export const { handlers: { GET, POST }, auth } = NextAuth({
    providers: [
        GitHub({
            clientId: process.env.GITHUB_CLIENT_ID!,
            clientSecret: process.env.GITHUB_CLIENT_SECRET!,
        })
    ],
    // ...add more options here if needed
});


//summary of corrected error:
//The previous error occurred because NextAuth(authOptions) was being used as a function handler—either by calling it directly or returning it inside a function—which is not supported in Auth.js/NextAuth.js v5+ for the Next.js App Router.
//
// What Was the Error
// Error:
//
// "TypeError: Function.prototype.apply was called on #<Object>, which is an object and not a function."
//
// TypeScript: "TS2349: This expression is not callable. Type 'NextAuthResult' has no call signatures."
//
// Cause:
//
// In v5+, NextAuth(authOptions) returns an object with handler methods (GET, POST), not a function.
//
// Exporting or calling the result as a function (or wrapping it in another function) leads to runtime and type errors.
//
// What Changed Now
// Now:
//
// The handlers object is immediately destructured from the result of NextAuth(authOptions), so GET and POST handlers are exported directly.
//
// There is no function wrapping, call, or manual invocation.
//
// Only the correct handler signatures are exported, matching what App Router expects.
//
// Summary Table
// Before	After
// Called/returned NextAuth(authOptions) as a function	Exported { handlers: { GET, POST } } from object
// Caused runtime/type errors	No errors, correct export
// This reflects the required update for Next.js App Router authentication using Auth.js v5+ and ensures everything works as expected.