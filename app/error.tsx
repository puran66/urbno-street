'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to error reporting service
    console.error('Error:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAF9F7] px-4">
      <div className="text-center max-w-md">
        <h1 className="font-archivo text-4xl md:text-6xl font-bold mb-4">Oops!</h1>
        <h2 className="font-archivo text-xl md:text-2xl uppercase mb-4">Something went wrong</h2>
        <p className="text-gray-600 mb-8">
          We encountered an unexpected error. Please try again or return to the homepage.
        </p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={reset}
            className="bg-black text-white px-6 py-3 rounded-md font-semibold hover:bg-gray-800 transition"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="border border-black text-black px-6 py-3 rounded-md font-semibold hover:bg-gray-100 transition"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}

