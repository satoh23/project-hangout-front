import Head from "next/head";

export default function AuthLayout({ children, title="Hang Out" }) {
    return (
        <div>
            <Head>
                <title>{title}</title>
                <link href="https://fonts.googleapis.com/earlyaccess/hannari.css" rel="stylesheet"></link>
            </Head>
            <div className="flex justify-center items-center flex-col min-h-screen text-black font-mono bg-white">
                <main className="flex flex-1 justify-center items-center flex-col w-screen">
                    {children}
                </main>
                <footer className="w-full h-6 flex justify-center items-center text-gray-500 text-sm">
                    @Hang out
                </footer>
            </div>
        </div>
    );
}
