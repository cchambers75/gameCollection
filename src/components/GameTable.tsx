"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { FaExternalLinkAlt } from "react-icons/fa";

type Games = {
	title: string;
	category: string;
	playersMin: number;
	playersMax: number;
	playingTime: number;
	link: string;
};

function debounce(func: (...args: any[]) => void, wait: number) {
	let timeout: NodeJS.Timeout;
	return (...args: any[]) => {
		clearTimeout(timeout);
		timeout = setTimeout(() => func(...args), wait);
	};
}

const GameTable: React.FC<{ data: Games[] }> = ({ data }) => {
	const [searchTerm, setSearchTerm] = useState("");
	const [sortConfig, setSortConfig] = useState<{
		key: keyof Games;
		direction: "ascending" | "descending";
	} | null>(null);
	const [searchResults, setSearchResults] = useState<Games[]>(data); // initialize with games list

	const handleSearch = debounce((value: string) => {
		setSearchResults(
			data.filter(
				(game: Games) =>
					game.title.toLowerCase().includes(value.toLowerCase()) ||
					game.category.toLowerCase().includes(value.toLowerCase()) ||
					(game.playersMin <= Number(value) &&
						game.playersMax >= Number(value)) ||
					game.playingTime === Number(value)
			)
		);
	}, 500);

	useEffect(() => {
		handleSearch(searchTerm);
	}, [searchTerm]);

	useEffect(() => {
		let sortedGames = [...searchResults];
		if (sortConfig !== null) {
			sortedGames.sort((a, b) => {
				if (a[sortConfig.key] < b[sortConfig.key]) {
					return sortConfig.direction === "ascending" ? -1 : 1;
				}
				if (a[sortConfig.key] > b[sortConfig.key]) {
					return sortConfig.direction === "ascending" ? 1 : -1;
				}
				return 0;
			});
		}
		setSearchResults(sortedGames);
	}, [sortConfig]);

	const requestSort = (key: keyof Games) => {
		setSortConfig((prev) => {
			if (prev && prev.key === key && prev.direction === "ascending") {
				return { key, direction: "descending" };
			}
			return { key, direction: "ascending" };
		});
	};

	return (
		<div className="px-4 sm:px-6 lg:px-8 w-full">
			<div className="sm:flex sm:justify-end">
				<div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
					<input
						type="text"
						placeholder="Search"
						value={searchTerm}
						className="shadow-lg block w-full sm:text-md p-2 border-gray-300 rounded-md focus:border-blue-600 focus:ring-black"
						onChange={(e) => setSearchTerm(e.target.value)}
					/>
				</div>
			</div>
			<div className="mt-8 flow-root">
				<div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
					<div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
						<div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
							<table className="min-w-full divide-y divide-gray-300">
								<thead className="bg-slate-200">
									<tr className="divide-x divide-gray-200 rounded-md">
										<th
											scope="col"
											className="py-3.5 pl-4 pr-4 text-left text-sm font-semibold text-gray-900 sm:pl-2"
											onClick={() => requestSort("title")}
										>
											Title
										</th>
										<th
											scope="col"
											className="px-4 py-3.5 text-left text-sm font-semibold text-gray-900"
											onClick={() => requestSort("category")}
										>
											Category
										</th>
										<th
											scope="col"
											className="px-4 py-3.5 text-left text-sm font-semibold text-gray-900"
											onClick={() => requestSort("playersMin")}
										>
											Players
										</th>
										<th
											scope="col"
											className="py-3.5 pl-4 pr-4 text-left text-sm font-semibold text-gray-900
		                                sm:pr-0"
											onClick={() => requestSort("playingTime")}
										>
											Playing Time
										</th>
										<th
											scope="col"
											className="py-3.5 pl-4 pr-4 text-left text-sm font-semibold text-gray-900 sm:pr-0"
										>
											More Info
										</th>
									</tr>
								</thead>
								<tbody className="divide-y divide-gray-200 bg-white">
									{searchResults.map((game, idx) => (
										<tr
											key={idx}
											className="divide-x divide-gray-200 even:bg-slate-100"
										>
											<td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm font-medium text-gray-900 sm:pl-4">
												{game.title}
											</td>
											<td className="whitespace-nowrap p-4 text-sm text-gray-500">
												{game.category}
											</td>
											<td className="whitespace-nowrap p-4 text-sm text-gray-500">
												{game.playersMin} to {game.playersMax}
											</td>
											<td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm text-gray-500 sm:pr-0">
												{game.playingTime === 0
													? "Flexible"
													: `${game.playingTime} min`}
											</td>
											<td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm text-gray-500 sm:pr-0">
												{game.link ? (
													<Link target="_blank" href={game.link}>
														<FaExternalLinkAlt />
													</Link>
												) : (
													""
												)}
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default GameTable;
