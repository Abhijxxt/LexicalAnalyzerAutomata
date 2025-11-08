import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const name = formData.get("name") as string;
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ success: false, message: "No file uploaded." });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadDir = path.join(process.cwd(), "public", "uploads");
    const filePath = path.join(uploadDir, file.name);

    await writeFile(filePath, buffer);

    console.log(`File uploaded by: ${name}, Path: ${filePath}`);

    return NextResponse.json({
      success: true,
      message: `File uploaded successfully by ${name}`,
      filePath: `/uploads/${file.name}`,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, message: "Upload failed" });
  }
}
