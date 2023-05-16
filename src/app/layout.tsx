import "./globals.css";

export const metadata = {
	title: "Jessica's Game Collection",
	description: "A collection of board games that Jessica owns.",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className="w-screen h-full bg-blue-400">{children}</body>
		</html>
	);
}
