import Image from "next/image";

export default function Loading() {
	return (
		<div className="w-screen h-screen flex justify-center items-center">
			<Image
				src={"/whiteChessPiece.png"}
				alt="Queen Chess Piece"
				width={300}
				height={300}
				className="animate-spin"
			/>
		</div>
	);
}
