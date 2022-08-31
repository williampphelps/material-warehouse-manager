import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"

export default NextAuth({
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: { label: "Username", type: "text", placeholder: "Enter Username Here..." },
                password: { label: "Password", type: "password", placeholder: "Enter Password Here..." },
            },
            async authorize(credentials, req) {
                const res = await fetch("http://10.10.11.65:3000/api/auth/login", {
                    method: 'POST',
                    body: JSON.stringify(credentials),
                    headers: { "Content-Type": "application/json" }
                });
                const user = await res.json()

                if (res.ok && user) {
                    console.log("USER AUTHENTIC")
                    console.log(user);
                    return user
                }
                return null
            }
        }),
    ],
    callbacks: {
        jwt: ({ token, user }) => {
            if (user) {
                token.user = {
                    id: user._id,
                    fname: user.fname,
                    lname: user.lname,
                    uname: user.username,
                    type: user.type,
                }
            }
            return token
        },
        session: ({ session, token }) => {
            if (token) {
                session.user = token.user;
            }
            return session
        }
    },
    pages: {
        signIn: '/auth/signin',
    },
    secret: process.env.NEXTAUTH_SECRET,
    jwt: {
        secret: process.env.NEXTAUTH_SECRET,
        encryption: true
    },
})
