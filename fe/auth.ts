import NextAuth, { NextAuthConfig } from "next-auth"
import { JWT } from "next-auth/jwt"
import Keycloak from "next-auth/providers/keycloak"

export const authConfig: NextAuthConfig = {
    providers: [Keycloak],
    callbacks: {
        authorized: async ({ request, auth }) => {
            if (request.nextUrl.pathname === '/') return true
            // Logged in users are authenticated, otherwise redirect to login page
            return !!auth
        },
        jwt: async ({ account, token }) => {
            if (account) {
                token.accessToken = account.access_token
            }
            return token
        },
        session: async ({ session, token }) => {
            if (token.accessToken) {
                session.accessToken = token.accessToken
            }
            console.log(session);
            
            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET
}
export const { handlers, signIn, signOut, auth } = NextAuth(authConfig)