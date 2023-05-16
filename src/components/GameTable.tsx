import { GoogleSpreadsheet } from "google-spreadsheet";
import Table from "./Table";

export const revalidate = 60;

type Games = {
	title: string;
	category: string;
	playersMin: number;
	playersMax: number;
	playingTime: number;
	link: string;
};

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

const GameTable = async () => {
	const data = await getGames();

	return <Table data={data} />;
};

export default GameTable;
