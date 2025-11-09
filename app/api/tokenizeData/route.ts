import Tokenize from "@/app/_services/_tokenize";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const { word } = await request.json();
    const {token, type} = Tokenize(word);

    return NextResponse.json({ token, type }, { status: 200 });

}