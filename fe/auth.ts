import NextAuth, { NextAuthConfig } from "next-auth"
import { JWT } from "next-auth/jwt"
import Keycloak from "next-auth/providers/keycloak"

export const authConfig: NextAuthConfig = {
    providers: [Keycloak({

    })],
    callbacks: {
        authorized: async ({ request, auth }) => {
            if (request.nextUrl.pathname === '/') return true
            // Logged in users are authenticated, otherwise redirect to login page
            return !!auth
        },
        async jwt({ token, account }) {
            if (account) {
                return {
                    ...token,
                    access_token: account.access_token || "",
                    expires_at: account.expires_at || Date.now() + 180,
                    refresh_token: account.refresh_token || "",
                }
            } else if (Date.now() > token.expires_at * 1000) {
                return await refreshToken(token);
            }
            return token;
        },
        session: async ({ session, token }) => {
            if (token.access_token) {
                session.access_token = token.access_token as string
            }
            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET
}
export const { handlers, signIn, signOut, auth } = NextAuth(authConfig)

async function refreshToken(token: JWT) {
    const url = `${process.env.AUTH_KEYCLOAK_ISSUER}/protocol/openid-connect/token`;
    try {
        const response = await fetch(url, {
            method: "POST",
            body: new URLSearchParams({
                client_id: process.env.AUTH_KEYCLOAK_ID!,
                client_secret: process.env.AUTH_KEYCLOAK_SECRET!,
                grant_type: "refresh_token",
                refresh_token: token.refresh_token!,
            }),
        })
        const body = await response.json()
        if (response.ok) {
            return {
                ...token,
                access_token: body.access_token,
                expires_at: body.expires_in,
                refresh_token: body.refresh_token,
            }
        }
    } catch (error) {
    }

    return token
}