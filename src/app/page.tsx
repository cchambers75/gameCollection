import GameTable from "@/components/GameTable";
import { Suspense } from "react";

export default function Home() {
	return (
		<main className="flex min-h-screen flex-col items-center p-4 md:p-16">
			<h1 className="text-7xl pb-4">Jessica&apos;s Game Collection</h1>
			<Suspense fallback={"loading..."}>
				{/* @ts-expect-error Server Component */}
				<GameTable />
			</Suspense>
		</main>
	);
}
