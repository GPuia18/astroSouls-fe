import { writeFile } from "fs/promises";
import { join } from "path";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request) {
  const data = await request.formData();
  const file = data.get("file");

  if (!file) {
    return NextResponse.json({ success: false });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // Define the desired path within the public directory
  const publicPath = join(process.cwd(), "public", "uploads", file.name);

  // Write the file to the public/uploads directory
  await writeFile(publicPath, buffer);
  console.log(`File uploaded to ${publicPath}`);

  return NextResponse.json({ success: true });
}
