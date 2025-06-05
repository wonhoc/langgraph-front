import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import mainApi from "@/lib/main.axios";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: "email", type: "email" },
                password: { label: "password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    return null;
                }

                try {
                    const loginData = {
                        email: credentials.email,
                        password: credentials.password,
                    };
                    const response = await mainApi.post(
                        "/auth/login",
                        loginData
                    );

                    const data = await response.data;

                    if (data.access_token) {
                        return {
                            id: data.id || data.id,
                            email: loginData.email,
                            name: loginData.email,
                            accessToken: data.access_token,
                            refreshToken: data.refresh_token,
                        };
                    }
                    return null;
                } catch (error) {
                    console.error("Login error:", error);
                    return null;
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.accessToken = user.accessToken;
            }
            return token;
        },
        async session({ session, token }) {
            session.accessToken = token.accessToken as string;
            return session;
        },
    },
    pages: {
        signIn: "/",
    },
    session: {
        strategy: "jwt",
    },
};
