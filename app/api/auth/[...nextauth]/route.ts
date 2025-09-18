import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";

// Edge-compatible handler for Next.js app router (v13+)
const authOptions = {
    providers: [
        GitHub({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
        })
    ],
    // Add other options here as needed
};

// NextAuth returns an object, but Edge expects a function - call it like this:
const handler = NextAuth(authOptions);

export const GET = handler;
export const POST = handler;
