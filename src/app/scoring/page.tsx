import ScoringTable from "@/components/ScoringTable";
import { Press_Start_2P } from "next/font/google";

const pressStart2p = Press_Start_2P({ weight: "400", subsets: ["latin"] });

const Scoring = () => {
	return (
		<main className="flex min-h-screen flex-col items-center p-4 md:p-16 w-screen">
			<div className={pressStart2p.className}>
				<h1 className=" text-2xl sm:text-6xl pb-4 text-center text-orange-200">
					Jessica&apos;s Game Collection
				</h1>
			</div>

			<ScoringTable />
		</main>
	);
};
export default Scoring;
