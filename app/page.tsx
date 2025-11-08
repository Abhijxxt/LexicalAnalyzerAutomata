"use client";
import { useState } from "react";
import { useRouter } from "next/navigation"; // ✅ correct import for App Router

export default function Home() {
  const [fileData, setFileData] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const router = useRouter(); // ✅ use this instead of importing router directly

  const uploadFile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const input = e.currentTarget.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;
    const file = input?.files?.[0];

    if (!file) {
      alert("Please select a file first.");
      return;
    }

    setFileName(file.name);

    // Read file content (text-based)
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      setFileData(text);

      // ✅ Save file data in localStorage after reading
      localStorage.setItem("fileData", text);

      // ✅ Navigate AFTER file has been read
      router.push("/lexer");
    };
    reader.readAsText(file);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-lg">
        <h1 className="text-2xl font-semibold mb-4 text-center">
          Lexical Analyzer
        </h1>

        <form onSubmit={uploadFile} className="flex flex-col gap-4">
          <input
            type="file"
            accept=".txt,.dav, .json, .csv, .c"
            className="border border-gray-300 rounded-lg p-2"
          />

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-2 transition"
          >
            Read File
          </button>
        </form>

        {fileName && (
          <p className="mt-4 text-gray-600 text-sm">
            <strong>File:</strong> {fileName}
          </p>
        )}
      </div>
    </div>
  );
}
