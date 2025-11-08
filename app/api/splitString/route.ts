import StringSplitter from "@/app/_services/_stringSplitter";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const {fileData} = await request.json();
    const splittedData = StringSplitter(fileData);
    if(!splittedData) {
        return NextResponse.json({"success": "failed"}, {status: 400});
    }
    return NextResponse.json(splittedData, {status: 200});
}