"use client";

import Lottie from "lottie-react";
import loading from "../../../../public/assets/loading.json";

export default function Loading() {
	return(
		<div className="min-h-screen flex flex-col items-center justify-center bg-background px-4">
            <div className="w-96 max-w-sm">
                <Lottie animationData={loading} loop={true} />
            </div>
        </div>
	)
}