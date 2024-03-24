"use client"

import { UserAuth } from "./context/AuthContext";

export default function Home() {
	const { user } = UserAuth();
	return (
		<section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
			{user ? (
				<p className="text-lg text-gray-600">You are logged in as {user.email}</p>
			) : (
				<p className="text-lg text-gray-600">Please sign in to use the app</p>
			)}
		</section>
	);
}
