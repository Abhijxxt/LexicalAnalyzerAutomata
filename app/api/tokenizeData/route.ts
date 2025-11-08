import Tokenize from "@/app/_services/_tokenize";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const { word } = await request.json();
    const tokenized = Tokenize(word);

    return NextResponse.json({ tokenized }, { status: 200 });

}