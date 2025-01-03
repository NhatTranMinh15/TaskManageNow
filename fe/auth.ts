import axios, { AxiosError } from "axios"
import NextAuth, { NextAuthConfig } from "next-auth"
import { JWT } from "next-auth/jwt"
import Keycloak from "next-auth/providers/keycloak"
import { redirect } from 'next/navigation'

export const authConfig: NextAuthConfig = {
    providers: [Keycloak],
    callbacks: {
        authorized: async ({ request, auth }) => {
            if (request.nextUrl.pathname === '/') return true
            // Logged in users are authenticated, otherwise redirect to login page
            return !!auth
        },
        jwt: async ({ token, account, user }) => {
            if (account) {
                return {
                    ...token,
                    access_token: account.access_token || "",
                    expires_at: (Date.now() + (account.expires_in || 300) * 1000),
                    refresh_token: account.refresh_token || "",
                }
            } else if (Date.now() > token.expires_at) {
                return await refreshToken(token);
            }
            return token;
        },
        session: async ({ session, token }) => {
            if (token.access_token) {
                session.access_token = token.access_token as string
            }
            session.user.id = token.sub || "";
            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET
}
export const { handlers, signIn, signOut, auth } = NextAuth(authConfig)

async function refreshToken(token: JWT) {
    const url = `${process.env.AUTH_KEYCLOAK_ISSUER}/protocol/openid-connect/token`;
    try {
        const param = new URLSearchParams({
            client_id: process.env.AUTH_KEYCLOAK_ID!,
            client_secret: process.env.AUTH_KEYCLOAK_SECRET!,
            grant_type: "refresh_token",
            refresh_token: token.refresh_token!,
        })
        const response = await axios.post(url, param)        
        const body = await response.data

        return {
            ...token,
            access_token: body.access_token,
            expires_at: (Date.now() + (body.expires_in || 300) * 1000),
            refresh_token: body.refresh_token,
        } as JWT
    } catch (error) {
        if (error instanceof AxiosError) {
            const err = error.response?.data
            if (err && err.error_description === 'Token is not active') {
                return redirect('/api/auth/signin')
            }
        }
        return redirect('/api/auth/signin')
    }
}