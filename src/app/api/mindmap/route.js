import { NextResponse } from "next/server";

const apiKey = process.env.GEMINI_API_KEY;
const model = process.env.GEMINI_MODEL || "models/gemini-pro-latest";

export async function POST(req) {
  try {
    const { pubTitle, pubAbstract, source_url } = await req.json();

    if (!pubAbstract && !source_url && !pubTitle) {
      return NextResponse.json({ error: "Missing publication content" }, { status: 400 });
    }

    // Prompt: AI returns hierarchical JSON tree ONLY
    const prompt = `
You are a scientific mind map generator. For the publication below:
- Extract major topics from the title & abstract
- For each topic, list subtopics, then key points
- Return output as hierarchical JSON tree ONLY
- Do NOT include extra text

Format:
{
  "name": "Publication Title",
  "children": [
    { "name": "Major Topic 1", "children": [
        { "name": "Subtopic A", "children": [...] }
      ]
    },
    { "name": "Major Topic 2", "children": [...] }
  ]
}

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

    let content = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || "";

    // Clean markdown backticks or extra text
    content = content.replace(/```json/g, "").replace(/```/g, "").trim();

    let treeData;
    try {
      treeData = JSON.parse(content);
    } catch (err) {
      console.warn("Failed to parse AI mindmap:", err);
      treeData = { name: pubTitle || "Publication", children: [] };
    }

    return NextResponse.json(treeData);
  } catch (err) {
    console.error("Mindmap route error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
