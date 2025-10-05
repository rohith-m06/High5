// src/app/api/fetchImage/route.js
import { NextResponse } from "next/server";
import fetch from "node-fetch";
import { JSDOM } from "jsdom";

export async function POST(req) {
  try {
    const { source_url } = await req.json();
    if (!source_url) return NextResponse.json({ image: null });

    const res = await fetch(source_url, { timeout: 15000 });
    if (!res.ok) return NextResponse.json({ image: null });

    const html = await res.text();
    const dom = new JSDOM(html);
    const document = dom.window.document;

    // Try main article image or first <img>
    let img = document.querySelector("figure img") || document.querySelector("img");
    let imageUrl = img?.src || null;

    // Convert relative URL to absolute if needed
    if (imageUrl && imageUrl.startsWith("/")) {
      const baseUrl = new URL(source_url).origin;
      imageUrl = baseUrl + imageUrl;
    }

    return NextResponse.json({ image: imageUrl });
  } catch (err) {
    console.error("Image fetch error:", err);
    return NextResponse.json({ image: null });
  }
}
