import type { Metadata } from "next";
import { AppName } from "@/app/layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles } from "lucide-react";
import SignIn from "@/components/ui/auth/sign-in";

export const metadata: Metadata = {
    title: `Sign In - ${AppName}`,
    description: `Sign in to your account for the ${AppName}`,
};

const SignInPage = () => {
    return (
        <main className="app-shell-bg flex min-h-svh items-center justify-center px-6 py-10">
            <Card className="w-full max-w-md border border-border/7 bg-white shadow-none ring-1 ring-border/50">
                <CardHeader className="items-center text-center">
                    <div className="mb-2 flex size-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
                        <Sparkles className="size-5" />
                    </div>
                    <CardTitle className="font-heading text-3xl font-semibold">Meeting Assistant</CardTitle>
                    <CardDescription className="text-base leading-relaxed text-muted-foreground">
                        Sign in to your account to access the Calendar Assistant.
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                    <SignIn />
                </CardContent>
            </Card>
        </main>
    )
}

export default SignInPage
