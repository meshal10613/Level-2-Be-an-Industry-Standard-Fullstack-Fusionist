"use client";

import Link from "next/link";
import Lottie from "lottie-react";
import { Button } from "@/components/ui/button";
import notFound from "../../public/assets/not-found.json";

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4">
            <div className="w-96 max-w-sm">
                <Lottie animationData={notFound} loop={true} />
            </div>
            <Button asChild className="mt-6">
                <Link href="/" className="flex items-center gap-2">
                    Return Home
                </Link>
            </Button>
        </div>
    );
}
