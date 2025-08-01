import { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  // Add any other NextAuth.js configurations here, like:
  // pages: {
  //   signIn: "/auth/signin", // Your custom sign-in page
  // },
  // callbacks: {
  //   async jwt({ token, user, account }) {
  //     // ... custom logic for JWT
  //     return token;
  //   },
  //   async session({ session, token }) {
  //     // ... custom logic for session
  //     return session;
  //   },
  // },
  // session: {
  //   strategy: "jwt",
  // },
  // debug: process.env.NODE_ENV === "development",
};