import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
	return (
		<Html lang="en">
			<Head>
				<script
					src="https://unpkg.com/react-scan/dist/auto.global.js"
					async
				/>
			</Head>
			<body className="min-h-screen bg-gray-900 text-white">
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
