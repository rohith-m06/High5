// Sample post creation script
// This creates a demo post with file attachment
// Run this once to add sample data to your Firebase

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';

// Your Firebase config (same as in your app)
const firebaseConfig = {
  apiKey: "AIzaSyCxO8cn6_iZfPLdoA8a94o_nA25Xfny4vU",
  authDomain: "high5-5f77e.firebaseapp.com",
  projectId: "high5-5f77e",
  storageBucket: "high5-5f77e.firebasestorage.app",
  messagingSenderId: "824551301843",
  appId: "1:824551301843:web:13b1dbb4dce0d95ac47f82",
  measurementId: "G-GFNQ9GQT5X"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function createSamplePosts() {
  try {
    // Sample post with PDF attachment
    await addDoc(collection(db, "posts"), {
      name: "Dr. Sarah Johnson",
      content: `🚀 Excited to share our latest research findings on Mars soil composition!

Check out the attached PDF for detailed analysis and methodology. This study reveals fascinating insights about potential biosignatures in Martian regolith samples.

Key findings:
• 23% higher mineral diversity than expected
• Presence of perchlorates confirmed
• Potential for subsurface water ice

Would love to hear your thoughts! #MarsResearch #Astrobiology`,
      category: "research",
      likes: 12,
      hasFile: true,
      fileName: "sample-attachment.pdf",
      fileSize: 584,
      fileUrl: "/sample-attachment.pdf",
      createdAt: serverTimestamp()
    });

    // Sample post with image attachment
    await addDoc(collection(db, "posts"), {
      name: "High5 Team",
      content: `Welcome to the High5 Space Community Platform! 🌟

We're thrilled to have you here. This platform is designed for space enthusiasts, researchers, and scientists to collaborate and share knowledge.

Check out our community logo attached below! Feel free to explore, post your research, and connect with fellow space enthusiasts.

Let's reach for the stars together! 🚀✨`,
      category: "general",
      likes: 45,
      hasFile: true,
      fileName: "sample-image.svg",
      fileSize: 1200,
      fileUrl: "/sample-image.svg",
      createdAt: serverTimestamp()
    });

    // Sample post with README
    await addDoc(collection(db, "posts"), {
      name: "Community Admin",
      content: `📚 Platform Guide & Documentation

New to High5? Check out the attached README file for a comprehensive guide on how to use the platform!

Learn about:
✓ Creating posts with attachments
✓ Engaging with the community
✓ Available categories
✓ Best practices

The README is also available in our repository for anyone to reference. Happy exploring!`,
      category: "news",
      likes: 28,
      hasFile: true,
      fileName: "sample-readme.md",
      fileSize: 2048,
      fileUrl: "/sample-readme.md",
      createdAt: serverTimestamp()
    });

    console.log("✅ Sample posts created successfully!");
    console.log("📁 Files are stored in /public directory");
    console.log("🔥 Check your Firebase console to see the posts");
  } catch (error) {
    console.error("❌ Error creating sample posts:", error);
  }
}

createSamplePosts();
