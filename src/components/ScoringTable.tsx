"use client";

import Link from "next/link";
import { useState } from "react";
import { TiDeleteOutline } from "react-icons/ti";
import EndGameDialog from "./EndGameDialog";

interface Player {
	playerNum: number;
	name: string;
	totalScore: number;
	roundScore: number[];
}

const ScoringTable = () => {
	const [players, setPlayers] = useState<Player[]>([]);
	const [name, setName] = useState("");
	const [numRounds, setNumRounds] = useState(5);
	const [game, setGame] = useState(false);

	const handleAddPlayer = () => {
		setPlayers((prevPlayers) => [
			...prevPlayers,
			{
				playerNum: players.length + 1,
				name,
				totalScore: 0,
				roundScore: [0, 0, 0, 0, 0],
			},
		]);
		setName("");
	};

	const handlePlayerRemove = (playerNum: number) => {
		setPlayers((prevPlayers) =>
			prevPlayers.filter((player) => player.playerNum !== playerNum)
		);
	};

	const handleGameBuild = () => {
		setGame(true);
	};

	const handleScoreChange = (
		playerNum: number,
		round: number,
		score: number
	) => {
		setPlayers((prevPlayers) => {
			const playersCopy = JSON.parse(JSON.stringify(prevPlayers));
			const player = playersCopy.find(
				(player: Player) => player.playerNum === playerNum
			);
			if (player) {
				player.roundScore[round] = score;
				player.totalScore = player.roundScore.reduce(
					(a: number, b: number) => a + b,
					0
				);
			}
			return playersCopy;
		});
	};

	const addRound = () => {
		setNumRounds((prevRounds) => prevRounds + 1);
		setPlayers((prevPlayers) => {
			const playersCopy = JSON.parse(JSON.stringify(prevPlayers));
			playersCopy.forEach((player: { roundScore: number[] }) =>
				player.roundScore.push(0)
			);
			return playersCopy;
		});
	};

	const removeRound = () => {
		if (numRounds > 1) {
			setNumRounds((prevRounds) => prevRounds - 1);
			setPlayers((prevPlayers) => {
				const playersCopy = JSON.parse(JSON.stringify(prevPlayers));
				playersCopy.forEach(
					(player: { roundScore: number[]; totalScore: number }) => {
						player.roundScore.pop();
						if (player.roundScore.length > 0) {
							player.totalScore = player.roundScore.reduce((a, b) => a + b);
						} else {
							player.totalScore = 0;
						}
					}
				);
				return playersCopy;
			});
		}
	};

	return (
		<>
			<div className="flex items-center justify-center w-full p-4">
				<Link href={"/"}>
					<button className="w-32 h-10 mb-2 sm:mb-0 bg-orange-200 rounded-md shadow-lg hover:bg-orange-300 text-gray-700">
						Games List
					</button>
				</Link>
			</div>
			{!game && (
				<div className="bg-slate-200 shadow-lg rounded-md px-10 py-6">
					<div className="flex flex-col space-y-4 justify-center items-center">
						<div className="w-48 space-y-4 text-center">
							<label htmlFor="numPlayers" className="font-semibold text-2xl">
								Add Players
							</label>
							<input
								type="text"
								value={name}
								className="rounded-md p-2 focus:outline-orange-200"
								onChange={(e) => setName(e.target.value)}
							/>
						</div>

						<div className="flex flex-row space-x-4">
							<button
								className="w-32 h-10 mb-2 sm:mb-0 bg-orange-200 rounded-md shadow-lg hover:bg-orange-300 text-gray-700"
								onClick={handleAddPlayer}
								disabled={name === ""}
							>
								Add Player
							</button>
							<button
								className="w-32 h-10 mb-2 sm:mb-0 bg-orange-200 rounded-md shadow-lg hover:bg-orange-300 text-gray-700"
								onClick={handleGameBuild}
								disabled={players.length < 1}
							>
								Start Game
							</button>
						</div>

						{players.length > 0 && (
							<div className="w-full flex flex-col items-center">
								<h3 className="font-semibold text-lg underline">
									Players in Game
								</h3>
								<ul className="w-6/12 px-2">
									{players.map((player) => (
										<li
											key={player.playerNum}
											className="flex flex-row space-x-2 items-center justify-between"
										>
											<span className="capitalize text-sm w-full flex-wrap">
												{player.name}
											</span>
											<button
												type="button"
												onClick={() => handlePlayerRemove(player.playerNum)}
											>
												<TiDeleteOutline className="text-red-600" />
											</button>
										</li>
									))}
								</ul>
							</div>
						)}
					</div>
				</div>
			)}

			{game && (
				<>
					<div className="flex flex-row space-x-4 pt-4">
						<button
							className="w-32 h-10 mb-2 sm:mb-0 bg-orange-200 rounded-md shadow-lg hover:bg-orange-300 text-gray-700"
							onClick={addRound}
						>
							Add Round
						</button>

						<EndGameDialog setPlayers={setPlayers} setGame={setGame} />

						<button
							className="w-32 h-10 mb-2 sm:mb-0 bg-orange-200 rounded-md shadow-lg hover:bg-orange-300 text-gray-700"
							onClick={removeRound}
						>
							Remove Round
						</button>
					</div>
					<div className="mt-8 flow-root">
						<div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
							<div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
								<div className="overflow-hidden shadow-lg ring-1 ring-black ring-opacity-5 sm:rounded-lg">
									<table className="min-w-full divide-y divide-gray-300">
										<thead className="bg-slate-200">
											<tr>
												<th scope="col" className="w-24"></th>
												{players.map((player) => (
													<th
														key={player.playerNum}
														scope="col"
														className="px-3 py-3.5 text-center text-lg font-semibold text-gray-900"
													>
														{player.name}
													</th>
												))}
											</tr>
										</thead>
										<tbody className="divide-y divide-gray-200 bg-white">
											{Array.from({ length: numRounds }).map((_, idx) => (
												<tr key={idx} className="divide-x even:bg-slate-100">
													<td className="whitespace-nowrap text-lg font-semibold text-gray-900 text-center">
														Round {idx + 1}
													</td>
													{players.map((player) => (
														<td
															key={player.playerNum}
															className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-center"
														>
															<input
																className="text-center border focus:border-blue-400 focus:outline-blue-400 rounded-lg px-4 py-2 w-full"
																type="number"
																onChange={(e) =>
																	handleScoreChange(
																		player.playerNum,
																		idx,
																		Number(e.target.value)
																	)
																}
															/>
														</td>
													))}
												</tr>
											))}
											<tr className="bg-slate-200 divide-x">
												<td className="whitespace-nowrap py-4 pl-4 pr-3 text-lg font-semibold text-gray-900 sm:pl-6">
													Total
												</td>
												{players.map((player) => (
													<td
														key={player.playerNum}
														className="whitespace-nowrap px-3 py-4 text-lg text-gray-900 font-semibold text-center"
													>
														{player.totalScore}
													</td>
												))}
											</tr>
										</tbody>
									</table>
								</div>
							</div>
						</div>
					</div>
				</>
			)}
		</>
	);
};
export default ScoringTable;
