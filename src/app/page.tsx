import GameTable from "@/components/GameTable";
import { Suspense } from "react";
import { Press_Start_2P } from "next/font/google";
import Loading from "./loading";

const pressStart2p = Press_Start_2P({ weight: "400", subsets: ["latin"] });

export const revalidate = 0;

export default function Home() {
	return (
		<main className="flex min-h-screen flex-col items-center p-4 md:p-16">
			<div className={pressStart2p.className}>
				<h1 className=" text-2xl sm:text-6xl pb-4 text-center text-orange-200">
					Jessica&apos;s Game Collection
				</h1>
			</div>

			<Suspense fallback={<Loading />}>
				{/* @ts-expect-error Server Component */}
				<GameTable />
			</Suspense>
		</main>
	);
}
