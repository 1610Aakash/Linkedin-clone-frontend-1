import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import API from '../api';

const Home = () => {
  const { user } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await API.get('/posts');
        setPosts(res.data);
      } catch (err) {
        console.error("Failed to fetch posts:", err);
      }
    };

    if (user) {
      fetchPosts();
    }
  }, [user]);

  const hardcodedPosts = [
    {
      id: "h1",
      name: "Sarah Mitchell",
      content: "🚀 Just deployed my first full-stack project!",
      description:
        "It's a job board built with React, Node, and MongoDB. Learned so much about deployment and authentication!",
      time: "2h ago",
    },
    {
      id: "h2",
      name: "John Carter",
      content: "💼 Open to new frontend opportunities!",
      description:
        "React, Tailwind, and design systems are my strengths. Feel free to reach out!",
      time: "6h ago",
    },
    {
      id: "h3",
      name: "Nina Joshi",
      content: "🎉 Just cleared my AWS Certified Developer Associate exam!",
      description:
        "Months of preparation paid off. Happy to help anyone looking for tips and resources!",
      time: "1d ago",
    },
    {
      id: "h4",
      name: "Devendra Rao",
      content: "👨‍💻 Building a Notion clone using React + Firebase",
      description:
        "It's a great way to understand real-time updates and multi-user collaboration logic.",
      time: "2d ago",
    },
    {
      id: "h5",
      name: "Lisa Fernandez",
      content: "🌟 Internship at Microsoft begins today!",
      description:
        "Excited to be part of a brilliant team working on scalable backend infrastructure!",
      time: "3d ago",
    },
  ];

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center bg-gray-100 px-4">
        <h1 className="text-4xl font-bold text-blue-700 mb-2">Welcome to LinkedIn Clone</h1>
        <p className="text-lg text-gray-600 mb-4">
          Please <span className="font-semibold">Login</span> or <span className="font-semibold">Signup</span> to see and share posts with the community.
        </p>
        <img
          src="/landing-illustration.png"
          alt="Landing Illustration"
          className="max-w-md w-full"
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row gap-4 p-4 bg-gray-100 min-h-screen">
      {/* Left: Profile Info */}
      <div className="w-full md:w-1/4 bg-white shadow rounded p-4">
        <div className="text-center">
          <img
            src="/user-image.png"
            alt="User Avatar"
            className="w-24 h-24 mx-auto rounded-full mb-2 object-cover"
          />
          <h2 className="font-bold text-xl">{user.name}</h2>
          {user.bio && <p className="text-gray-600 text-sm mt-1">{user.bio}</p>}
          {user.location && <p className="text-gray-600 text-sm">{user.location}</p>}
        </div>
      </div>

      {/* Center: Posts Feed */}
      <div className="flex-1 w-full">
        <div className="bg-white shadow rounded p-4">
          <h2 className="text-lg font-semibold mb-4">Recent Posts</h2>

          {posts.length > 0 ? (
            <div className="space-y-4 mb-6">
              {posts.map((post) => (
                <div key={post._id} className="border p-4 rounded bg-white hover:shadow transition">
                  <p className="font-semibold text-blue-800">{post.author?.name || "Unknown User"}</p>
                  <p className="text-lg font-bold mt-1">{post.title || 'Untitled'}</p>
                  <p className="text-gray-700 mt-1 whitespace-pre-line">
                    {post.description || post.content || 'No description available.'}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(post.createdAt).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">No posts yet.</p>
          )}

          <h2 className="text-lg font-semibold mb-2 mt-6">Community Highlights</h2>
          <div className="space-y-4">
            {hardcodedPosts.map((post) => (
              <div key={post.id} className="border p-3 rounded hover:shadow transition">
                <p className="font-semibold text-blue-800">{post.name}</p>
                <p className="text-lg font-bold mt-1">{post.content}</p>
                <p className="text-sm text-gray-600">{post.description}</p>
                <p className="text-xs text-gray-500 mt-1">{post.time}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
