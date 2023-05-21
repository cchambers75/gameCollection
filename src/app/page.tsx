import GameTable from "@/components/GameTable";
import { Suspense } from "react";
import { Press_Start_2P } from "next/font/google";
import Loading from "./loading";
import { GoogleSpreadsheet } from "google-spreadsheet";

type Games = {
	title: string;
	category: string;
	playersMin: number;
	playersMax: number;
	playingTime: number;
	link: string;
};

const pressStart2p = Press_Start_2P({ weight: "400", subsets: ["latin"] });

export const revalidate = 0;

async function getGames() {
	const doc = new GoogleSpreadsheet(
		"15r7axbjFtiJqLKuU-zJpRIaE5x_NjlS7yQEtmBfMlbo"
	);

	doc.useApiKey(process.env.GOOGLE_API_KEY as string);

	await doc.loadInfo();

	const sheet = doc.sheetsByIndex[0];
	const rows = await sheet.getRows();
	const rowData: Games[] = rows.map((row) => {
		return {
			title: row["Title"],
			category: row["Category"],
			playersMin: parseInt(row["Players (Min)"]),
			playersMax: parseInt(row["Players (Max)"]),
			playingTime: parseInt(row["Playing Time (Min)"]),
			link: row["Website Link"],
		};
	});
	rowData.sort((a, b) => {
		if (a.title < b.title) {
			return -1;
		} else if (a.title > b.title) {
			return 1;
		} else {
			return 0;
		}
	});
	return rowData;
}

export default async function Home() {
	const data = await getGames();
	return (
		<main className="flex min-h-screen flex-col items-center p-4 md:p-16">
			<div className={pressStart2p.className}>
				<h1 className=" text-2xl sm:text-6xl pb-4 text-center text-orange-200">
					Jessica&apos;s Game Collection
				</h1>
			</div>

			<Suspense fallback={<Loading />}>
				<GameTable data={data} />
			</Suspense>
		</main>
	);
}
