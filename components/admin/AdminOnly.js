import { useSession } from 'next-auth/react';
export default function AdminOnly({ children }) {
    const { data: session } = useSession();
    if (session) {
        if (session.user.type == "admin") {
            return (
                <>
                {children}
                </>
            )
        }
    }
}
