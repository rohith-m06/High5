"use client";        // ← required for client-side Firebase calls

import CommunityTab from "../app/components/CommunityTab";

export default function Home() {
  return (
    <main style={{ maxWidth: 680, margin: "2rem auto", fontFamily: "sans-serif" }}>
      <h1>High5 Community</h1>
      <CommunityTab />
    </main>
  );
}