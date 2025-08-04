// src/components/PostForm.js
import { useState } from "react";
import API from "../api";

const PostForm = ({ onPost }) => {
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return alert("Post cannot be empty!");

    try {
      const res = await API.post("/posts", { content });
      if (onPost) onPost(res.data); // update parent post list
      setContent("");
    } catch (err) {
      console.error("Failed to create post:", err?.response?.data || err.message);
      alert("Post failed. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 bg-white p-4 rounded-lg shadow">
      <textarea
        className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        rows="3"
        placeholder="What's on your mind?"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button
        type="submit"
        className="mt-3 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded transition"
      >
        Post
      </button>
    </form>
  );
};

export default PostForm;
