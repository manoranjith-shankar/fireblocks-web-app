"use client"

import { useAppStore } from "./AppStore";

export default function Home() {

	const { loggedUser } = useAppStore();
	return (
		<section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
			loggedUser: { loggedUser ? loggedUser.email : "No user logged in" }
		</section>
	);
}
