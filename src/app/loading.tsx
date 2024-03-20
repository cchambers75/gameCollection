import Image from "next/image";
import whiteChessPiece from "../../public/whiteChessPiece.png";

export default function Loading() {
	return (
		<div className="w-screen h-screen flex justify-center items-center">
			<Image
				src={whiteChessPiece}
				alt="Queen Chess Piece"
				width={300}
				height={300}
				className="animate-spin"
				priority
			/>
		</div>
	);
}
