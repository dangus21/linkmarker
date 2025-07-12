import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

function NotFound() {
	return (
		<>
			<Head>
				<title>Linkmarker - 404</title>
			</Head>
			<main className="relative isolate min-h-screen">
				<Image
					width={1000}
					height={1000}
					src="/404.png"
					alt=""
					className="absolute inset-0 -z-10 size-full object-cover object-center"
				/>
				<div className="mx-auto max-w-7xl px-6 py-32 text-center sm:py-40 lg:px-8">
					<p className="text-base leading-8 font-semibold text-white">
						404
					</p>
					<h1 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-5xl">
						Page not found
					</h1>
					<p className="mt-4 text-base text-white/70 sm:mt-6">
						Sorry, we couldn’t find the page you’re looking for.
					</p>
					<div className="mt-10 flex justify-center">
						<Link
							href="/"
							className="text-sm leading-7 font-semibold text-white"
						>
							<span aria-hidden="true">&larr;</span> Back to home
						</Link>
					</div>
				</div>
			</main>
		</>
	);
}
export default NotFound;
