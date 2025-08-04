import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import { AuthContext } from "../context/AuthContext";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      return alert("Please enter both title and description.");
    }

    try {
      await API.post("/posts", { title, description });
      navigate("/home");
    } catch (err) {
      console.error("Post creation failed:", err);
      alert("Failed to create post.");
    }
  };

  if (!user) {
    return (
      <div className="p-6 text-center text-lg font-medium min-h-screen flex items-center justify-center bg-gray-100">
        Please log in to create a post.
      </div>
    );
  }

  return (
    <div className="p-6 min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl bg-white p-8 rounded-xl shadow-lg"
      >
        <h2 className="text-2xl font-bold text-center text-blue-700 mb-6">Create a New Post</h2>

        {/* User Info */}
        <div className="mb-6 flex items-center gap-4">
          <img
            src="/user-image.png"
            alt="User"
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <p className="font-semibold text-lg text-gray-800">{user.name}</p>
          </div>
        </div>

        {/* Title Field */}
        <input
          type="text"
          className="w-full border border-gray-300 rounded px-4 py-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Post Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        {/* Description Field */}
        <textarea
          rows="5"
          className="w-full border border-gray-300 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Write your post description..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button
          type="submit"
          className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md text-lg font-medium transition duration-200"
        >
          Post
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
