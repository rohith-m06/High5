import { useState } from "react";
import { doc, updateDoc, increment, collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";

export default function PostCard({ post }) {
  const [comment, setComment] = useState("");
  const [name, setName] = useState("");

  const handleLike = async () => {
    await updateDoc(doc(db, "posts", post.id), {
      likes: increment(1)
    });
  };

  const handleComment = async (e) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim()) return;

    await addDoc(collection(db, "posts", post.id, "comments"), {
      name: name.trim(),
      content: comment.trim(),
      likes: 0,
      createdAt: serverTimestamp()
    });

    setComment("");
  };

  return (
    <div style={{ border: "1px solid #ccc", padding: "1rem", marginBottom: "1rem" }}>
      <strong>{post.name}</strong>
      <p>{post.content}</p>
      <button onClick={handleLike}>Like ({post.likes})</button>

      <form onSubmit={handleComment}>
        <input
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <br />
        <textarea
          placeholder="Add a comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
        />
        <br />
        <button type="submit">Comment</button>
      </form>
    </div>
  );
}