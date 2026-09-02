"use client"

import { Button } from "@/components/ui/button"
import { useDescope } from "@descope/nextjs-sdk/client"
import { useRouter } from "next/dist/client/components/navigation"
import { useState } from "react"

const DashboardPage = () => {
    const sdk = useDescope()
    const router = useRouter()
    const [loggingOut, setLoggingOut] = useState(false)

    async function handleLogout() {
        if (loggingOut) return
        setLoggingOut(true)

        try {
            await sdk.logout()
            router.replace("/sign-in")
            router.refresh()
        } catch (error) {
            console.error("Logout failed:", error)
        } finally {
            setLoggingOut(false)
        }
    }

    return (
        <div>
            Dashboard Page
            <Button onClick={handleLogout}>Log Out</Button>
        </div>
    )
}

export default DashboardPage
