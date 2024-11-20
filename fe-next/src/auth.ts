import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import {
  InactiveAccountError,
  InvalidEmailPasswordError,
} from "./utils/errors";
import { sendRequest } from "./utils/api";
import { IUser } from "./types/next-auth";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        username: {},
        password: {},
      },
      authorize: async (credentials) => {
        const res = await sendRequest<IBackendRes<ILogin>>({
          method: "POST",
          url: "http://localhost:9090/api/v1/auth/login",
          body: {
            username: credentials.username,
            password: credentials.password,
          },
        });

        if (res.statusCode === 201) {
          return {
            _id: res.data?.user?._id,
            name: res.data?.user?.name,
            email: res.data?.user?.email,
            access_token: res.data?.access_token,
          };
        } else if (+res.statusCode === 401) {
          throw new InvalidEmailPasswordError();
        } else if (+res.statusCode === 400) {
          throw new InactiveAccountError();
        } else {
          throw new Error(res.message);
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        // User is available during sign-in
        token.user = user as IUser;
      }
      return token;
    },
    session({ session, token }) {
      (session.user as IUser) = token.user;
      return session;
    },
    authorized: async ({ auth }) => {
      return !!auth;
    },
  },
});
