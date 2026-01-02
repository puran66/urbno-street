export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAF9F7]">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black mb-4"></div>
        <p className="text-gray-600 font-inter">Loading...</p>
      </div>
    </div>
  );
}

