"use client";

import { useEffect, useState } from "react";

export default function LexerPage() {

    const [fileData, setFileData] = useState<string | null>(null);
    const [splittedData, setSplittedData] = useState<string[] | null>(null);
    const [count, setCount] = useState<number>(0);

    useEffect(() => {
        // Load data from localStorage when page loads
        const data = localStorage.getItem("fileData");
        if (data) setFileData(data);
    }, []);

    const splitData = async () => {
        const response = await fetch('/api/splitString', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ fileData }),
        });
        if(response.status === 200) {
            const data = await response.json();
            setSplittedData(data);
        }
    }

    const tokenizeData = async () => {
        const word = splittedData ? splittedData[count] : null;
        console.log(word);
        if(!word) {
            alert("No more words to tokenize");
            return;
        }
        const response = await fetch('/api/tokenizeData', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ word }),
        });
        const data = await response.json();
        console.log("Tokenized data:", data.tokenized);
        setCount(count + 1);
    } 


    return (
        <div>
            <h1>Hello world</h1>
            {fileData && (
                <div className="mt-6 bg-gray-100 rounded-lg p-4 max-h-64 overflow-y-auto text-sm font-mono whitespace-pre-wrap">
                {fileData}
            </div>
            )}
            <button onClick={splitData}>Split data</button>
            {splittedData && (
                <div className="mt-6 bg-gray-100 rounded-lg p-4 max-h-64 overflow-y-auto text-sm font-mono whitespace-pre-wrap">
                {splittedData.map((item, index) => <p key={index}>INDEX: {index}; ITEM: {item}</p>)}
            </div>)}
            <button onClick={tokenizeData}>Tokenize word</button>
        </div>
    )
}