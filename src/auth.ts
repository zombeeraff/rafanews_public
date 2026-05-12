import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

const publicPaths = ["/", "/about", "/signin"];

const allowedEmails = ["rafaelaguirreacc@gmail.com"];

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [Google],
  pages: {
    signIn: "/signin",
  },
  callbacks: {
    signIn({ user }) {
      return allowedEmails.includes(user.email ?? "");
    },
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isPublic = publicPaths.includes(nextUrl.pathname);
      return isPublic || isLoggedIn;
    },
  },
});
