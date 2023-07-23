import "./globals.css";
import { Roboto } from "next/font/google";

export const metadata = {
	title: "Jessica's Game Collection",
	description: "A collection of board games that Jessica owns.",
};

const roboto = Roboto({ weight: "400", subsets: ["latin"] });

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className={roboto.className}>
				<main className="w-screen h-full bg-blue-400">{children}</main>
			</body>
		</html>
	);
}
