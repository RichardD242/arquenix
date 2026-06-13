import Link from 'next/link';

export default function Home() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-[#0b0f19] text-white p-6">
            <h1 className="text-5xl font-extrabold mb-4 bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
                Arquenix (own custom) Docs
            </h1>
            <p className="text-gray-400 text-lg mb-8 max-w-md text-center">
                custom docs platform built for Arquenix
            </p>
            <Link
                href="/docs/getting-started"
                className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg shadow-lg transition-colors"
            >
                Get Started
            </Link>
        </div>
    );
}