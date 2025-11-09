"use client";

import { useEffect, useState } from "react";
import AutomataGraphPage from "../automata/page";
import Link from "next/link";

export default function LexerPage() {

    const states = [0,1,2,3,4,5,6,7,8,9]
    const transitions = [
    //   0  1  2 3   4  5  6  7  8  9
        [0, 1, 0, 0, 0, 0, 0, 0, 0, 0], // 0
        [0, 0, 1, 0, 0, 0, 0, 0, 0, 0], // 1
        [0, 0, 0, 1, 1, 1, 1, 1, 1, 0], // 2
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 1], // 3
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 1], // 4
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 1], // 5
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 1], // 6
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 1], // 7
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 1], // 8
        [0, 1, 0, 0, 0, 0, 0, 0, 0, 0], // 9
        
    ]


    const [fileData, setFileData] = useState<string | null>(null);
    const [splittedData, setSplittedData] = useState<string[] | null>(null);
    const [count, setCount] = useState<number>(0);
    const [tokenizedData, setTokenizedData] = useState<{token: string, type: string} | null>(null);
    const [state, setState] = useState<number>(0);
    const [hideStateButton, setHideStateButton] = useState<boolean>(false);

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
        console.log("Tokenized data:", data.token, data.type);
        setTokenizedData(data);
        setCount(count + 1);
    } 

    const stateTransition = async () => {
        const currentState = state
        
            for(let j=0; j<states.length; j++) {
                // console.log("Current State:", currentState, "i:", currentState, "j:", j);
                if(currentState === 1) {
                    tokenizeData();
                    setState(2);
                    return;
                }
                if(currentState === 2) {
                    if(tokenizedData?.type === "SYMBOL") {
                        setState(7);
                        return;
                    }
                    else if(tokenizedData?.type === "KEYWORD") {
                        console.log("KEYWORD detected");
                        setState(5);
                        return;
                    }
                    else if(tokenizedData?.type === "OPERATOR") {
                        setState(6);
                        return;
                    }
                    else if(tokenizedData?.type === "DATA_TYPE") {
                        setState(4);
                        return;
                    }
                    else if(tokenizedData?.type === "IDENTIFIER") {
                        setState(3);
                        return;
                    }
                    else if(tokenizedData?.type === "SPECIAL_CHARACTER") {
                        setState(8);
                        return;
                    }
                }
                if(currentState === 0) {
                    splitData();
                    setState(1);
                    return;
                }
                if(currentState === 9) {
                    const word = splittedData ? splittedData[count] : null
                    if(!word) {
                        alert("No more words to tokenize");
                        setState(9);
                        setHideStateButton(true);
                        return;
                    }
                }
                if(transitions[currentState][j] === 1) {
                    setState(j);
                    return;
                }
                
            }
        
    }
    console.log("Current state:", state);
    return (
        <div>
            <div className="w-full bg-gray-100 flex flex-row justify-center items-center shadow-sm mb-4">
                <h1 className="text-3xl p-4 font-semibold text-blue-950">Lexical Analyzer</h1>
                {/* <Link href="/about" className="text-red-600  hover:underline p-4">What is it?</Link> */}
            </div>
            {state === 0  && fileData && (
                <div className="p-2 m-5">
                    <h1 className="text-xl font-bold">Code:</h1>
                    <div className="mt-1 bg-slate-100 rounded-lg p-4 max-h-50 overflow-y-auto text-sm font-mono whitespace-pre-wrap">
                        {fileData}
                    </div>
                </div>
            )}
            {/* <button onClick={splitData}>Split data</button> */}
            {splittedData && (
                <div className="p-2 m-5">
                    <h1 className="text-xl font-bold">Splitted Data:</h1>
                    <div className="mt-1 bg-slate-100 rounded-lg p-4 max-h-50 overflow-y-auto text-sm font-mono whitespace-pre-wrap">
                        {splittedData.map((item, index) => <p key={index} style={count-1 == index ? {color: "red"} : {color: "black"}}>INDEX: {index}; ITEM: {item}</p>)}
                    </div>
                </div>
            )}
            {/* <button onClick={tokenizeData}>Tokenize word</button> */}
            {!hideStateButton && <button onClick={stateTransition} className="bg-emerald-400 px-4 py-2 rounded-md m-2 ml-7 shadow-md hover:shadow-none">Next state</button>}
            {tokenizedData && 
            <div className="flex flex-row justify-center items-center">
                <p className="bg-blue-300 p-2 rounded-md m-4">Word: {splittedData ? splittedData[count-1] : null}</p> 
                <p className="bg-blue-400 p-2 rounded-md m-4">Token: {tokenizedData.token}</p> 
                <p className="bg-blue-500 p-2 rounded-md m-4">Type: {tokenizedData.type}</p>
            </div>
            }
            <AutomataGraphPage word= {splittedData ? splittedData[count-1] : null} state={state}/>
        </div>
    )
}