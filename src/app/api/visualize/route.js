import { NextResponse } from "next/server";

const apiKey = process.env.GEMINI_API_KEY;
const model = process.env.GEMINI_MODEL || "models/gemini-pro-latest";

export async function POST(req) {
  try {
    const { pubTitle, pubAbstract, source_url } = await req.json();

    // Safety check
    if (!pubAbstract && !source_url && !pubTitle) {
      return NextResponse.json({ error: "Missing publication content" }, { status: 400 });
    }

    // 🔹 Prompt asking AI to return ONLY valid JSON
    const prompt = `
You are a scientific knowledge graph generator.
Generate a knowledge graph for the following publication.
Return output as pure JSON ONLY with structure:

{
  "nodes": [{"id": "node name", "group": number, "color": "hex color"}],
  "links": [{"source": "source node", "target": "target node", "value": number}]
}

Do NOT include any extra text.

Title: ${pubTitle || "N/A"}
Abstract: ${pubAbstract || "N/A"}
URL: ${source_url || "N/A"}
`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/${model}:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
      }
    );

    const data = await response.json();

    let content =
      data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || "";

    // 🔹 Clean response: remove ```json, ``` or extra text
    content = content.replace(/```json/g, "").replace(/```/g, "").trim();

    let graphData;
    try {
      graphData = JSON.parse(content);
    } catch (err) {
      console.warn("Failed to parse AI response:", err);
      graphData = { nodes: [], links: [] };
    }

    return NextResponse.json(graphData);
  } catch (error) {
    console.error("Visualization route error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}